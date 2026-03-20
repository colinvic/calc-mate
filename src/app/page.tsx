"use client";

import { useState, useEffect, useCallback } from "react";
import { topics, allProblems, getNextProblem, type Problem, type Topic } from "@/lib/problems";
import { getProgress, recordAnswer, getTopicProgress, type UserProgress } from "@/lib/storage";
import katex from "katex";

type Screen = "home" | "topic" | "problem" | "results";

function KaTeX({ math, display = false }: { math: string; display?: boolean }) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: display,
  });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function StarRating({ filled, total = 3 }: { filled: number; total?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={i < filled ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHints, setShowHints] = useState<number>(0);
  const [showSteps, setShowSteps] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0, streak: 0 });
  const [animateXP, setAnimateXP] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const loadNextProblem = useCallback(
    (topic: Topic) => {
      if (!progress) return;
      const difficulty = progress.currentDifficulty[topic.id] || 1;
      const completed = progress.completedProblems[topic.id] || [];
      const next = getNextProblem(topic.id, completed, difficulty);
      if (next) {
        setCurrentProblem(next);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setShowHints(0);
        setShowSteps(false);
        setIsCorrect(null);
        setScreen("problem");
      } else {
        setScreen("results");
      }
    },
    [progress]
  );

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setSessionStats({ correct: 0, total: 0, streak: 0 });
    loadNextProblem(topic);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || !currentProblem || !progress) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentProblem.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    const newProgress = recordAnswer(currentProblem.topic, currentProblem.id, correct, progress);
    setProgress(newProgress);

    setSessionStats((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
      streak: correct ? prev.streak + 1 : 0,
    }));

    if (correct) {
      setAnimateXP(true);
      setTimeout(() => setAnimateXP(false), 1000);
      if (sessionStats.streak + 1 >= 5) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  const handleNext = () => {
    if (selectedTopic) {
      loadNextProblem(selectedTopic);
    }
  };

  if (!progress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-2xl font-bold text-blue-600">Loading CalcMate...</div>
      </div>
    );
  }

  // ===== HOME SCREEN =====
  if (screen === "home") {
    return (
      <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            CalcMate 🧮
          </h1>
          <p className="text-gray-500 text-lg">Master calculus step by step — no stress, mate!</p>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="xp-badge text-base">⚡ {progress.xp} XP</div>
          <div className="streak-badge text-base">🔥 {progress.streak} streak</div>
          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            📊 Level {progress.level}
          </div>
        </div>

        {/* Achievements */}
        {progress.achievements.length > 0 && (
          <div className="mb-8 text-center">
            <div className="flex justify-center gap-2 flex-wrap">
              {progress.achievements.includes("streak_10") && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">🏆 10 Streak!</span>
              )}
              {progress.achievements.includes("xp_100") && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">💎 100 XP</span>
              )}
              {progress.achievements.includes("xp_500") && (
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">👑 500 XP</span>
              )}
              {progress.achievements.includes("explorer") && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">🗺️ Explorer</span>
              )}
            </div>
          </div>
        )}

        {/* Topic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => {
            const isUnlocked = progress.unlockedTopics.includes(topic.id);
            const topicProgress = getTopicProgress(topic.id, progress);
            const score = progress.topicScores[topic.id];
            const difficulty = progress.currentDifficulty[topic.id] || 1;

            return (
              <div
                key={topic.id}
                onClick={() => isUnlocked && handleSelectTopic(topic)}
                className={`topic-card ${!isUnlocked ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{topic.icon}</span>
                  {isUnlocked ? (
                    <StarRating filled={difficulty} />
                  ) : (
                    <span className="text-2xl">🔒</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{topic.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{topic.description}</p>

                {isUnlocked && score && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>{score.correct}/{score.total} correct</span>
                      <span>{topicProgress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${topicProgress}%` }} />
                    </div>
                  </div>
                )}

                {isUnlocked && !score && (
                  <div className="text-sm text-blue-500 font-medium">Ready to start →</div>
                )}

                {!isUnlocked && (
                  <div className="text-sm text-gray-400">
                    Complete{" "}
                    {topic.prerequisiteTopics
                      .map((id) => topics.find((t) => t.id === id)?.name)
                      .join(" & ")}{" "}
                    first
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* How it works */}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How CalcMate Works 💡</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold text-gray-700">Adaptive Difficulty</h3>
              <p className="text-gray-500 text-sm">Problems get harder as you improve. Struggling? It eases off automatically.</p>
            </div>
            <div>
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-bold text-gray-700">Step-by-Step</h3>
              <p className="text-gray-500 text-sm">Every problem has hints, worked solutions, and explanations in plain English.</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-bold text-gray-700">XP & Streaks</h3>
              <p className="text-gray-500 text-sm">Earn XP, build streaks, unlock topics, and level up as you learn.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== PROBLEM SCREEN =====
  if (screen === "problem" && currentProblem && selectedTopic) {
    return (
      <div className="min-h-screen p-4 md:p-8 max-w-3xl mx-auto">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-start justify-center pt-10">
            <div className="text-6xl animate-bounce">🎉🎊🎉</div>
          </div>
        )}

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setScreen("home")}
            className="btn-secondary text-sm"
          >
            ← Back
          </button>
          <div className="flex items-center gap-3">
            <div className={`xp-badge ${animateXP ? "animate-bounce" : ""}`}>⚡ {progress.xp} XP</div>
            <div className="streak-badge">🔥 {sessionStats.streak}</div>
          </div>
        </div>

        {/* Topic & Difficulty */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{selectedTopic.icon}</span>
          <span className="text-gray-500 text-sm font-medium">{selectedTopic.name}</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500 text-sm">{currentProblem.subtopic}</span>
          <span className="text-gray-300">•</span>
          <StarRating filled={currentProblem.difficulty} />
        </div>

        {/* Session Progress */}
        <div className="text-sm text-gray-400 mb-4">
          Question {sessionStats.total + (selectedAnswer === null ? 1 : 0)} •{" "}
          {sessionStats.correct}/{sessionStats.total} correct this session
        </div>

        {/* Problem Card */}
        <div className={`problem-card ${isCorrect === true ? "correct-flash" : ""} ${isCorrect === false ? "wrong-shake" : ""}`}>
          <h2 className="text-xl font-bold text-gray-800 mb-4">{currentProblem.question}</h2>

          {currentProblem.questionLatex && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center text-lg">
              <KaTeX math={currentProblem.questionLatex} display />
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {currentProblem.options.map((option, i) => {
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium ";
              if (selectedAnswer === null) {
                btnClass += "border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer";
              } else if (i === currentProblem.correctAnswer) {
                btnClass += "border-emerald-500 bg-emerald-50 text-emerald-800";
              } else if (i === selectedAnswer && !isCorrect) {
                btnClass += "border-red-400 bg-red-50 text-red-700";
              } else {
                btnClass += "border-gray-200 opacity-50";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selectedAnswer !== null}
                  className={btnClass}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                    {selectedAnswer !== null && i === currentProblem.correctAnswer && (
                      <span className="ml-auto text-emerald-500">✓</span>
                    )}
                    {selectedAnswer === i && !isCorrect && (
                      <span className="ml-auto text-red-500">✗</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hints */}
        {selectedAnswer === null && (
          <div className="mt-4">
            {showHints < currentProblem.hints.length && (
              <button
                onClick={() => setShowHints((h) => h + 1)}
                className="btn-hint"
              >
                💡 {showHints === 0 ? "Need a hint?" : "Another hint?"}
              </button>
            )}
            {showHints > 0 && (
              <div className="mt-3 space-y-2">
                {currentProblem.hints.slice(0, showHints).map((hint, i) => (
                  <div key={i} className="hint-box fade-in">
                    <p className="text-amber-800 text-sm">
                      <span className="font-bold">Hint {i + 1}:</span> {hint}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Explanation & Steps */}
        {showExplanation && (
          <div className="mt-6 fade-in">
            <div className={`p-5 rounded-xl border-2 ${isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
              <p className={`font-bold text-lg mb-2 ${isCorrect ? "text-emerald-700" : "text-red-700"}`}>
                {isCorrect ? "🎉 Nice one!" : "😤 Not quite — let's learn from this!"}
              </p>
              <p className="text-gray-700">{currentProblem.explanation}</p>
            </div>

            {/* Step by step */}
            <div className="mt-4">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="btn-secondary text-sm"
              >
                📝 {showSteps ? "Hide" : "Show"} step-by-step solution
              </button>
              {showSteps && (
                <div className="mt-3 space-y-2">
                  {currentProblem.steps.map((step, i) => (
                    <div key={i} className="step-box fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                      <p className="text-blue-800 text-sm">
                        <span className="font-bold text-blue-600">Step {i + 1}:</span> {step}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Next Button */}
            <div className="mt-6 flex justify-center">
              <button onClick={handleNext} className="btn-primary text-lg px-8">
                Next Question →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ===== RESULTS SCREEN =====
  if (screen === "results" && selectedTopic) {
    const topicProgress = getTopicProgress(selectedTopic.id, progress);
    return (
      <div className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto flex flex-col items-center justify-center">
        <div className="problem-card text-center w-full">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Topic Complete!</h2>
          <p className="text-gray-500 mb-6">You&apos;ve finished all available problems in {selectedTopic.name}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600">{sessionStats.correct}</div>
              <div className="text-sm text-gray-500">Correct</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-600">{sessionStats.total}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-emerald-600">{topicProgress}%</div>
              <div className="text-sm text-gray-500">Accuracy</div>
            </div>
          </div>

          <button onClick={() => setScreen("home")} className="btn-primary">
            ← Back to Topics
          </button>
        </div>
      </div>
    );
  }

  return null;
}
