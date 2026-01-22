import { questions } from '../data/questions';
import type { ScavengerQuestion } from '../types';

export type { ScavengerQuestion } from '../types';

/** Number of questions in scavenger hunt mode */
export const SCAVENGER_QUESTIONS_COUNT = 24;

/** Animation delay multiplier for staggered entrance */
export const ITEM_ANIMATION_DELAY = 0.03;

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate 24 randomized scavenger hunt questions
 */
export function generateScavengerQuestions(): ScavengerQuestion[] {
  const shuffled = shuffleArray(questions);
  return shuffled.map((text, index) => ({
    id: index,
    text,
    isCompleted: false,
  }));
}

/**
 * Toggle a question's completed state
 */
export function toggleScavengerQuestion(
  questions: ScavengerQuestion[],
  questionId: number
): ScavengerQuestion[] {
  return questions.map((question) =>
    question.id === questionId
      ? { ...question, isCompleted: !question.isCompleted }
      : question
  );
}

/**
 * Check if all questions are completed
 */
export function checkScavengerComplete(questions: ScavengerQuestion[]): boolean {
  if (questions.length === 0) return true;
  return questions.every((q) => q.isCompleted);
}

/**
 * Get completion progress statistics
 */
export function getCompletionProgress(questions: ScavengerQuestion[]): {
  completed: number;
  total: number;
  percentage: number;
} {
  const total = questions.length;
  const completed = questions.filter((q) => q.isCompleted).length;
  const percentage = calculatePercentage(completed, total);

  return { completed, total, percentage };
}

/**
 * Calculate percentage with proper rounding and bounds
 */
export function calculatePercentage(completed: number, total: number): number {
  return total > 0 ? Math.min(Math.round((completed / total) * 100), 100) : 0;
}
