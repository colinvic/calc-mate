export interface Problem {
  id: string;
  topic: string;
  subtopic: string;
  difficulty: 1 | 2 | 3;
  question: string;
  questionLatex: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hints: string[];
  steps: string[];
  prerequisite?: string;
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  subtopics: string[];
  prerequisiteTopics: string[];
}

export const topics: Topic[] = [
  {
    id: 'foundations',
    name: 'Foundations',
    icon: '🧱',
    description: 'Algebra, indices, and function basics you NEED before calculus',
    color: 'from-green-400 to-emerald-500',
    subtopics: ['Algebraic Manipulation', 'Index Laws', 'Function Notation', 'Linear Functions', 'Quadratics Review'],
    prerequisiteTopics: [],
  },
  {
    id: 'limits',
    name: 'Limits & Continuity',
    icon: '🎯',
    description: 'What happens as x gets really close to a number?',
    color: 'from-blue-400 to-indigo-500',
    subtopics: ['Intro to Limits', 'Evaluating Limits', 'Limits at Infinity', 'Continuity'],
    prerequisiteTopics: ['foundations'],
  },
  {
    id: 'derivatives-intro',
    name: 'Derivatives - The Basics',
    icon: '📐',
    description: 'Rates of change and the power rule',
    color: 'from-purple-400 to-violet-500',
    subtopics: ['What is a Derivative?', 'First Principles', 'Power Rule', 'Constant & Sum Rules'],
    prerequisiteTopics: ['foundations', 'limits'],
  },
  {
    id: 'derivatives-rules',
    name: 'Derivative Rules',
    icon: '⚡',
    description: 'Product, quotient, and chain rules',
    color: 'from-orange-400 to-red-500',
    subtopics: ['Product Rule', 'Quotient Rule', 'Chain Rule', 'Mixed Practice'],
    prerequisiteTopics: ['derivatives-intro'],
  },
  {
    id: 'applications',
    name: 'Applications',
    icon: '🚀',
    description: 'Using derivatives in real-world problems',
    color: 'from-pink-400 to-rose-500',
    subtopics: ['Tangent Lines', 'Rates of Change', 'Maxima & Minima', 'Curve Sketching'],
    prerequisiteTopics: ['derivatives-rules'],
  },
  {
    id: 'integration-intro',
    name: 'Integration Basics',
    icon: '∫',
    description: 'Reversing differentiation and finding areas',
    color: 'from-teal-400 to-cyan-500',
    subtopics: ['Antiderivatives', 'Basic Integration Rules', 'Definite Integrals', 'Area Under Curves'],
    prerequisiteTopics: ['derivatives-intro'],
  },
];

export const allProblems: Problem[] = [
  // ===== FOUNDATIONS =====
  {
    id: 'f1',
    topic: 'foundations',
    subtopic: 'Algebraic Manipulation',
    difficulty: 1,
    question: 'Expand and simplify: 3(2x + 5) - 4(x - 1)',
    questionLatex: '3(2x + 5) - 4(x - 1)',
    options: ['2x + 19', '2x + 11', '10x + 19', '2x + 14'],
    correctAnswer: 0,
    explanation: 'Distribute each bracket then collect like terms: 6x + 15 - 4x + 4 = 2x + 19',
    hints: [
      'Start by expanding each bracket separately',
      'Remember: a negative times a negative is positive, so -4 × (-1) = +4',
    ],
    steps: [
      'Expand first bracket: 3(2x + 5) = 6x + 15',
      'Expand second bracket: -4(x - 1) = -4x + 4',
      'Combine: 6x + 15 - 4x + 4',
      'Collect like terms: (6x - 4x) + (15 + 4) = 2x + 19',
    ],
  },
  {
    id: 'f2',
    topic: 'foundations',
    subtopic: 'Algebraic Manipulation',
    difficulty: 1,
    question: 'Factorise: x² + 7x + 12',
    questionLatex: 'x^2 + 7x + 12',
    options: ['(x + 3)(x + 4)', '(x + 2)(x + 6)', '(x + 1)(x + 12)', '(x + 4)(x + 4)'],
    correctAnswer: 0,
    explanation: 'Find two numbers that multiply to 12 and add to 7. That is 3 and 4.',
    hints: [
      'You need two numbers that multiply to give 12',
      'Those same two numbers must add to give 7',
    ],
    steps: [
      'We need two numbers that multiply to 12 AND add to 7',
      'Factors of 12: 1×12, 2×6, 3×4',
      '3 + 4 = 7 ✓',
      'So x² + 7x + 12 = (x + 3)(x + 4)',
    ],
  },
  {
    id: 'f3',
    topic: 'foundations',
    subtopic: 'Index Laws',
    difficulty: 1,
    question: 'Simplify: x³ × x⁵',
    questionLatex: 'x^3 \\times x^5',
    options: ['x⁸', 'x¹⁵', 'x²', '2x⁸'],
    correctAnswer: 0,
    explanation: 'When multiplying with the same base, ADD the indices: x³ × x⁵ = x^(3+5) = x⁸',
    hints: [
      'When you multiply powers with the same base, what do you do with the indices?',
      'Think: x×x×x multiplied by x×x×x×x×x — how many x\'s total?',
    ],
    steps: [
      'Rule: xᵃ × xᵇ = x^(a+b)',
      'x³ × x⁵ = x^(3+5)',
      '= x⁸',
    ],
  },
  {
    id: 'f4',
    topic: 'foundations',
    subtopic: 'Index Laws',
    difficulty: 2,
    question: 'Simplify: (2x³)²',
    questionLatex: '(2x^3)^2',
    options: ['4x⁶', '2x⁶', '4x⁵', '2x⁵'],
    correctAnswer: 0,
    explanation: 'Apply the power to BOTH the coefficient and the variable: (2)² × (x³)² = 4x⁶',
    hints: [
      'The power outside applies to everything inside the bracket',
      '(x³)² means multiply the indices: 3 × 2 = 6',
    ],
    steps: [
      'Apply power to each part: (2x³)² = 2² × (x³)²',
      '2² = 4',
      '(x³)² = x^(3×2) = x⁶',
      'Result: 4x⁶',
    ],
  },
  {
    id: 'f5',
    topic: 'foundations',
    subtopic: 'Function Notation',
    difficulty: 1,
    question: 'If f(x) = 2x² - 3x + 1, find f(2)',
    questionLatex: 'f(x) = 2x^2 - 3x + 1, \\text{ find } f(2)',
    options: ['3', '7', '5', '1'],
    correctAnswer: 0,
    explanation: 'Substitute x = 2: f(2) = 2(2)² - 3(2) + 1 = 8 - 6 + 1 = 3',
    hints: [
      'f(2) means replace every x with 2',
      'Be careful with order of operations — do the squared first!',
    ],
    steps: [
      'Replace x with 2: f(2) = 2(2)² - 3(2) + 1',
      'Calculate (2)² = 4',
      'So: 2(4) - 3(2) + 1',
      '= 8 - 6 + 1 = 3',
    ],
  },
  {
    id: 'f6',
    topic: 'foundations',
    subtopic: 'Linear Functions',
    difficulty: 1,
    question: 'What is the gradient of the line y = 3x - 7?',
    questionLatex: 'y = 3x - 7',
    options: ['3', '-7', '-3', '7'],
    correctAnswer: 0,
    explanation: 'In y = mx + c form, the gradient (m) is the coefficient of x, which is 3.',
    hints: [
      'The equation is already in y = mx + c form',
      'The gradient is the number in front of x',
    ],
    steps: [
      'Compare y = 3x - 7 with y = mx + c',
      'm = 3 (gradient)',
      'c = -7 (y-intercept)',
      'Gradient = 3',
    ],
  },
  {
    id: 'f7',
    topic: 'foundations',
    subtopic: 'Quadratics Review',
    difficulty: 2,
    question: 'Solve: x² - 5x + 6 = 0',
    questionLatex: 'x^2 - 5x + 6 = 0',
    options: ['x = 2 or x = 3', 'x = -2 or x = -3', 'x = 1 or x = 6', 'x = 2 or x = -3'],
    correctAnswer: 0,
    explanation: 'Factorise to (x - 2)(x - 3) = 0, giving x = 2 or x = 3',
    hints: [
      'Try to factorise the quadratic first',
      'Find two numbers that multiply to +6 and add to -5',
    ],
    steps: [
      'Need two numbers that multiply to 6 and add to -5',
      '-2 × -3 = 6 and -2 + (-3) = -5 ✓',
      'Factorise: (x - 2)(x - 3) = 0',
      'x - 2 = 0 → x = 2, or x - 3 = 0 → x = 3',
    ],
  },
  // ===== LIMITS =====
  {
    id: 'l1',
    topic: 'limits',
    subtopic: 'Intro to Limits',
    difficulty: 1,
    question: 'What does the limit mean in plain English?',
    questionLatex: '\\lim_{x \\to 3} f(x) = 7',
    options: [
      'As x gets closer to 3, f(x) gets closer to 7',
      'f(3) equals 7',
      'x can never reach 3',
      'The function stops at 7',
    ],
    correctAnswer: 0,
    explanation: 'A limit describes what value f(x) APPROACHES as x gets closer and closer to a number. It does not require f(3) to actually equal 7.',
    hints: [
      'Think of it as: what happens to the output as the input sneaks up on a value?',
      'The limit is about the JOURNEY, not necessarily the destination',
    ],
    steps: [
      'lim means "the limit"',
      'x → 3 means "as x approaches 3"',
      'f(x) = 7 means "the function approaches 7"',
      'Together: As x gets closer to 3, f(x) gets closer to 7',
    ],
  },
  {
    id: 'l2',
    topic: 'limits',
    subtopic: 'Evaluating Limits',
    difficulty: 1,
    question: 'Evaluate by direct substitution:',
    questionLatex: '\\lim_{x \\to 2} (x^2 + 3x - 1)',
    options: ['9', '10', '5', '7'],
    correctAnswer: 0,
    explanation: 'Direct substitution: (2)² + 3(2) - 1 = 4 + 6 - 1 = 9',
    hints: [
      'Try just plugging in x = 2 first — does it work?',
      'If substitution gives a normal number (not 0/0), that IS the limit',
    ],
    steps: [
      'Try direct substitution: plug in x = 2',
      '= (2)² + 3(2) - 1',
      '= 4 + 6 - 1',
      '= 9 ✓ (No 0/0, so direct substitution works!)',
    ],
  },
  {
    id: 'l3',
    topic: 'limits',
    subtopic: 'Evaluating Limits',
    difficulty: 2,
    question: 'Evaluate:',
    questionLatex: '\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}',
    options: ['6', '0', '3', 'Does not exist'],
    correctAnswer: 0,
    explanation: 'Direct substitution gives 0/0. Factorise the numerator: (x-3)(x+3)/(x-3) = x+3. Then substitute x=3: 3+3 = 6',
    hints: [
      'Try substituting x = 3 first — you get 0/0 which is indeterminate',
      'When you get 0/0, try factorising! x² - 9 is a difference of squares',
    ],
    steps: [
      'Try x = 3: (9-9)/(3-3) = 0/0 — indeterminate!',
      'Factorise numerator: x² - 9 = (x-3)(x+3)',
      'Simplify: (x-3)(x+3)/(x-3) = x + 3',
      'Now substitute x = 3: 3 + 3 = 6',
    ],
  },
  // ===== DERIVATIVES INTRO =====
  {
    id: 'd1',
    topic: 'derivatives-intro',
    subtopic: 'What is a Derivative?',
    difficulty: 1,
    question: 'A derivative tells you:',
    questionLatex: '\\frac{dy}{dx}',
    options: [
      'The rate of change (gradient) at any point',
      'The area under the curve',
      'The y-intercept of the function',
      'The maximum value of the function',
    ],
    correctAnswer: 0,
    explanation: 'The derivative gives the instantaneous rate of change, which is the gradient of the tangent line at any point on the curve.',
    hints: [
      'Think about what the gradient of a curve means at a specific point',
      'If you zoom in really close on a curve, it looks like a straight line — the derivative gives you that line\'s gradient',
    ],
    steps: [
      'A derivative measures how fast y changes when x changes',
      'Geometrically, it is the gradient of the tangent line',
      'dy/dx literally means "the change in y divided by the change in x"',
      'This gives the rate of change at any point',
    ],
  },
  {
    id: 'd2',
    topic: 'derivatives-intro',
    subtopic: 'Power Rule',
    difficulty: 1,
    question: 'Differentiate: f(x) = x⁴',
    questionLatex: 'f(x) = x^4',
    options: ['4x³', '3x⁴', 'x³', '4x⁴'],
    correctAnswer: 0,
    explanation: 'Power Rule: bring the power down and reduce by one. d/dx(x⁴) = 4x³',
    hints: [
      'The Power Rule: d/dx(xⁿ) = nxⁿ⁻¹',
      'Bring the 4 down to the front, then subtract 1 from the power',
    ],
    steps: [
      'Power Rule: d/dx(xⁿ) = n × x^(n-1)',
      'Here n = 4',
      'f\'(x) = 4 × x^(4-1)',
      'f\'(x) = 4x³',
    ],
  },
  {
    id: 'd3',
    topic: 'derivatives-intro',
    subtopic: 'Power Rule',
    difficulty: 1,
    question: 'Differentiate: f(x) = 5x³',
    questionLatex: 'f(x) = 5x^3',
    options: ['15x²', '5x²', '15x³', '3x²'],
    correctAnswer: 0,
    explanation: 'The constant 5 stays, and we apply the power rule to x³: 5 × 3x² = 15x²',
    hints: [
      'Constants multiply through: d/dx(5x³) = 5 × d/dx(x³)',
      'Apply the power rule to x³ first, then multiply by 5',
    ],
    steps: [
      'f(x) = 5x³',
      'Apply power rule: d/dx(x³) = 3x²',
      'Multiply by the constant: 5 × 3x² = 15x²',
      'f\'(x) = 15x²',
    ],
  },
  {
    id: 'd4',
    topic: 'derivatives-intro',
    subtopic: 'Constant & Sum Rules',
    difficulty: 1,
    question: 'Differentiate: f(x) = 3x² + 2x - 7',
    questionLatex: 'f(x) = 3x^2 + 2x - 7',
    options: ['6x + 2', '6x + 2x', '3x + 2', '6x - 7'],
    correctAnswer: 0,
    explanation: 'Differentiate each term: d/dx(3x²) = 6x, d/dx(2x) = 2, d/dx(-7) = 0',
    hints: [
      'Differentiate each term separately',
      'The derivative of a constant (like -7) is always 0',
    ],
    steps: [
      'Differentiate term by term:',
      'd/dx(3x²) = 3 × 2x = 6x',
      'd/dx(2x) = 2',
      'd/dx(-7) = 0 (constants vanish!)',
      'f\'(x) = 6x + 2',
    ],
  },
  {
    id: 'd5',
    topic: 'derivatives-intro',
    subtopic: 'Power Rule',
    difficulty: 2,
    question: 'Differentiate: f(x) = √x (write as a power first!)',
    questionLatex: 'f(x) = \\sqrt{x}',
    options: ['1/(2√x)', '2√x', '1/√x', '√x/2'],
    correctAnswer: 0,
    explanation: '√x = x^(1/2). Using the power rule: (1/2)x^(-1/2) = 1/(2√x)',
    hints: [
      'First rewrite √x as x^(1/2)',
      'Then apply the power rule with n = 1/2',
    ],
    steps: [
      'Rewrite: √x = x^(1/2)',
      'Power rule: (1/2) × x^(1/2 - 1)',
      '= (1/2) × x^(-1/2)',
      '= 1/(2√x)',
    ],
  },
  // ===== DERIVATIVE RULES =====
  {
    id: 'dr1',
    topic: 'derivatives-rules',
    subtopic: 'Product Rule',
    difficulty: 2,
    question: 'Using the product rule, differentiate: f(x) = x² × (3x + 1)',
    questionLatex: 'f(x) = x^2(3x + 1)',
    options: ['9x² + 2x', '6x² + 2x', '3x² + 1', '6x³ + x²'],
    correctAnswer: 0,
    explanation: 'Product rule: u\'v + uv\'. Let u = x², v = 3x+1. Then u\' = 2x, v\' = 3. Result: 2x(3x+1) + x²(3) = 6x²+2x+3x² = 9x²+2x',
    hints: [
      'Product rule: d/dx(uv) = u\'v + uv\'',
      'Let u = x² and v = (3x + 1). Find u\' and v\' first',
    ],
    steps: [
      'Let u = x², v = 3x + 1',
      'u\' = 2x, v\' = 3',
      'Product rule: u\'v + uv\' = 2x(3x+1) + x²(3)',
      '= 6x² + 2x + 3x² = 9x² + 2x',
    ],
  },
  {
    id: 'dr2',
    topic: 'derivatives-rules',
    subtopic: 'Chain Rule',
    difficulty: 2,
    question: 'Differentiate: f(x) = (2x + 3)⁴',
    questionLatex: 'f(x) = (2x + 3)^4',
    options: ['8(2x + 3)³', '4(2x + 3)³', '8(2x + 3)⁴', '4(2x)³'],
    correctAnswer: 0,
    explanation: 'Chain rule: bring power down, reduce power by 1, multiply by derivative of inside. 4(2x+3)³ × 2 = 8(2x+3)³',
    hints: [
      'Chain rule: d/dx[g(x)]ⁿ = n[g(x)]^(n-1) × g\'(x)',
      'The "inside" function is (2x + 3). What is its derivative?',
    ],
    steps: [
      'Outer function: ( )⁴, Inner function: 2x + 3',
      'Derivative of inner: d/dx(2x + 3) = 2',
      'Chain rule: 4(2x + 3)³ × 2',
      '= 8(2x + 3)³',
    ],
  },
  {
    id: 'dr3',
    topic: 'derivatives-rules',
    subtopic: 'Quotient Rule',
    difficulty: 3,
    question: 'Differentiate using the quotient rule:',
    questionLatex: 'f(x) = \\frac{x^2}{x + 1}',
    options: ['(x² + 2x)/(x+1)²', '2x/(x+1)', 'x²/(x+1)²', '(2x² + 2x)/(x+1)²'],
    correctAnswer: 0,
    explanation: 'Quotient rule: (u\'v - uv\')/v². u=x², v=x+1, u\'=2x, v\'=1. Result: (2x(x+1) - x²(1))/(x+1)² = (x²+2x)/(x+1)²',
    hints: [
      'Quotient rule: d/dx(u/v) = (u\'v - uv\')/v²',
      'Let u = x² (top) and v = x + 1 (bottom)',
    ],
    steps: [
      'u = x², v = x + 1',
      'u\' = 2x, v\' = 1',
      'Quotient rule: (u\'v - uv\')/v²',
      '= (2x(x+1) - x²(1))/(x+1)²',
      '= (2x² + 2x - x²)/(x+1)² = (x² + 2x)/(x+1)²',
    ],
  },
  // ===== APPLICATIONS =====
  {
    id: 'a1',
    topic: 'applications',
    subtopic: 'Tangent Lines',
    difficulty: 2,
    question: 'Find the gradient of the tangent to y = x³ at x = 2',
    questionLatex: 'y = x^3 \\text{ at } x = 2',
    options: ['12', '8', '6', '3'],
    correctAnswer: 0,
    explanation: 'The gradient of the tangent = the derivative at that point. dy/dx = 3x². At x=2: 3(2)² = 12',
    hints: [
      'The gradient of the tangent line = the derivative evaluated at that x value',
      'First find dy/dx, then substitute x = 2',
    ],
    steps: [
      'Find the derivative: dy/dx = 3x²',
      'Substitute x = 2:',
      'dy/dx = 3(2)² = 3(4) = 12',
      'The tangent has gradient 12 at x = 2',
    ],
  },
  {
    id: 'a2',
    topic: 'applications',
    subtopic: 'Maxima & Minima',
    difficulty: 2,
    question: 'Find the x-coordinate of the turning point of y = x² - 6x + 5',
    questionLatex: 'y = x^2 - 6x + 5',
    options: ['x = 3', 'x = -3', 'x = 6', 'x = 5'],
    correctAnswer: 0,
    explanation: 'At a turning point, dy/dx = 0. dy/dx = 2x - 6 = 0, so x = 3',
    hints: [
      'At a turning point (max or min), the gradient is zero',
      'Set dy/dx = 0 and solve for x',
    ],
    steps: [
      'Differentiate: dy/dx = 2x - 6',
      'At turning point: dy/dx = 0',
      '2x - 6 = 0',
      '2x = 6, so x = 3',
    ],
  },
  {
    id: 'a3',
    topic: 'applications',
    subtopic: 'Rates of Change',
    difficulty: 2,
    question: 'A ball is thrown upwards with height h = 20t - 5t² metres after t seconds. What is the velocity at t = 1?',
    questionLatex: 'h = 20t - 5t^2',
    options: ['10 m/s', '15 m/s', '20 m/s', '5 m/s'],
    correctAnswer: 0,
    explanation: 'Velocity = dh/dt = 20 - 10t. At t = 1: v = 20 - 10(1) = 10 m/s',
    hints: [
      'Velocity is the derivative of position (height) with respect to time',
      'Find dh/dt, then substitute t = 1',
    ],
    steps: [
      'Velocity = dh/dt (rate of change of height)',
      'dh/dt = 20 - 10t',
      'At t = 1: v = 20 - 10(1)',
      'v = 10 m/s',
    ],
  },
  // ===== INTEGRATION BASICS =====
  {
    id: 'i1',
    topic: 'integration-intro',
    subtopic: 'Antiderivatives',
    difficulty: 1,
    question: 'If the derivative of a function is 6x², what could the original function be?',
    questionLatex: "f'(x) = 6x^2",
    options: ['2x³ + C', '3x³ + C', '6x³ + C', '12x + C'],
    correctAnswer: 0,
    explanation: 'Integration reverses differentiation. The antiderivative of 6x² is 6x³/3 + C = 2x³ + C',
    hints: [
      'Integration is the reverse of differentiation',
      'If d/dx(xⁿ) = nxⁿ⁻¹, then the integral of xⁿ is x^(n+1)/(n+1)',
    ],
    steps: [
      'We need to reverse the power rule',
      'Integral of xⁿ = x^(n+1)/(n+1) + C',
      'Integral of 6x² = 6 × x³/3 + C',
      '= 2x³ + C (don\'t forget +C!)',
    ],
  },
  {
    id: 'i2',
    topic: 'integration-intro',
    subtopic: 'Basic Integration Rules',
    difficulty: 1,
    question: 'Evaluate:',
    questionLatex: '\\int 4x^3 \\, dx',
    options: ['x⁴ + C', '4x⁴ + C', '12x² + C', 'x⁴'],
    correctAnswer: 0,
    explanation: '∫4x³ dx = 4 × x⁴/4 + C = x⁴ + C',
    hints: [
      'Use the reverse power rule: add 1 to the power, divide by the new power',
      'Don\'t forget the constant of integration +C',
    ],
    steps: [
      'Reverse power rule: ∫xⁿ dx = x^(n+1)/(n+1) + C',
      '∫4x³ dx = 4 × x⁴/4 + C',
      '= x⁴ + C',
    ],
  },
  {
    id: 'i3',
    topic: 'integration-intro',
    subtopic: 'Definite Integrals',
    difficulty: 2,
    question: 'Evaluate:',
    questionLatex: '\\int_0^2 3x^2 \\, dx',
    options: ['8', '6', '12', '4'],
    correctAnswer: 0,
    explanation: 'Antiderivative of 3x² is x³. Evaluate from 0 to 2: (2)³ - (0)³ = 8 - 0 = 8',
    hints: [
      'First find the antiderivative, then use the Fundamental Theorem',
      'Evaluate F(2) - F(0) where F(x) is the antiderivative',
    ],
    steps: [
      'Find antiderivative: ∫3x² dx = x³',
      'Apply limits: [x³] from 0 to 2',
      '= (2)³ - (0)³',
      '= 8 - 0 = 8',
    ],
  },
];

export function getProblemsByTopic(topicId: string): Problem[] {
  return allProblems.filter(p => p.topic === topicId);
}

export function getProblemsByDifficulty(topicId: string, difficulty: number): Problem[] {
  return allProblems.filter(p => p.topic === topicId && p.difficulty <= difficulty);
}

export function getNextProblem(topicId: string, completedIds: string[], difficulty: number): Problem | null {
  const available = allProblems.filter(
    p => p.topic === topicId && !completedIds.includes(p.id) && p.difficulty <= difficulty
  );
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}
