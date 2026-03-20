// Local storage based progress tracking
// Works offline, no backend needed!

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedProblems: Record<string, string[]>; // topicId -> problemId[]
  topicScores: Record<string, { correct: number; total: number; bestStreak: number }>;
  unlockedTopics: string[];
  currentDifficulty: Record<string, number>; // topicId -> difficulty level
  achievements: string[];
}

const STORAGE_KEY = 'calcmate_progress';

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedProblems: {},
  topicScores: {},
  unlockedTopics: ['foundations'],
  currentDifficulty: { foundations: 1, limits: 1, 'derivatives-intro': 1, 'derivatives-rules': 1, applications: 1, 'integration-intro': 1 },
  achievements: [],
};

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(stored);
    // Check streak
    const today = new Date().toISOString().split('T')[0];
    const lastDate = parsed.lastActiveDate;
    if (lastDate) {
      const last = new Date(lastDate);
      const now = new Date(today);
      const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) {
        parsed.streak = 0; // Reset streak if missed a day
      }
    }
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function recordAnswer(
  topicId: string,
  problemId: string,
  correct: boolean,
  progress: UserProgress
): UserProgress {
  const updated = { ...progress };
  const today = new Date().toISOString().split('T')[0];

  // Update completed problems
  if (!updated.completedProblems[topicId]) {
    updated.completedProblems[topicId] = [];
  }
  if (!updated.completedProblems[topicId].includes(problemId)) {
    updated.completedProblems[topicId].push(problemId);
  }

  // Update topic scores
  if (!updated.topicScores[topicId]) {
    updated.topicScores[topicId] = { correct: 0, total: 0, bestStreak: 0 };
  }
  updated.topicScores[topicId].total += 1;

  if (correct) {
    updated.topicScores[topicId].correct += 1;
    updated.xp += 10;
    updated.streak += 1;

    // Track best streak per topic
    if (updated.streak > updated.topicScores[topicId].bestStreak) {
      updated.topicScores[topicId].bestStreak = updated.streak;
    }

    // Bonus XP for streaks
    if (updated.streak % 5 === 0) {
      updated.xp += 25; // Bonus every 5 correct in a row
    }

    // Level up every 100 XP
    updated.level = Math.floor(updated.xp / 100) + 1;

    // Difficulty progression: if 3+ correct in a row at current difficulty, bump up
    const currentDiff = updated.currentDifficulty[topicId] || 1;
    if (updated.streak >= 3 && currentDiff < 3) {
      updated.currentDifficulty[topicId] = Math.min(3, currentDiff + 1) as 1 | 2 | 3;
    }

    // Unlock topics based on score
    const score = updated.topicScores[topicId];
    if (score.correct >= 3) {
      // Unlock next topics
      const unlockMap: Record<string, string[]> = {
        foundations: ['limits', 'derivatives-intro'],
        limits: ['derivatives-intro'],
        'derivatives-intro': ['derivatives-rules', 'integration-intro'],
        'derivatives-rules': ['applications'],
      };
      const toUnlock = unlockMap[topicId] || [];
      toUnlock.forEach((t) => {
        if (!updated.unlockedTopics.includes(t)) {
          updated.unlockedTopics.push(t);
        }
      });
    }

    // Achievements
    if (updated.streak >= 10 && !updated.achievements.includes('streak_10')) {
      updated.achievements.push('streak_10');
    }
    if (updated.xp >= 100 && !updated.achievements.includes('xp_100')) {
      updated.achievements.push('xp_100');
    }
    if (updated.xp >= 500 && !updated.achievements.includes('xp_500')) {
      updated.achievements.push('xp_500');
    }
    if (Object.keys(updated.topicScores).length >= 3 && !updated.achievements.includes('explorer')) {
      updated.achievements.push('explorer');
    }
  } else {
    updated.streak = 0;
    updated.xp += 2; // Still get some XP for trying

    // If struggling (3+ wrong), reduce difficulty
    const currentDiff = updated.currentDifficulty[topicId] || 1;
    const score = updated.topicScores[topicId];
    const recentAccuracy = score.total > 0 ? score.correct / score.total : 0;
    if (recentAccuracy < 0.4 && score.total >= 3 && currentDiff > 1) {
      updated.currentDifficulty[topicId] = Math.max(1, currentDiff - 1) as 1 | 2 | 3;
    }
  }

  // Update last active date
  updated.lastActiveDate = today;

  saveProgress(updated);
  return updated;
}

export function getTopicProgress(topicId: string, progress: UserProgress): number {
  const score = progress.topicScores[topicId];
  if (!score || score.total === 0) return 0;
  return Math.round((score.correct / score.total) * 100);
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
