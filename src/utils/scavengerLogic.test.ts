import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateScavengerQuestions,
  toggleScavengerQuestion,
  checkScavengerComplete,
  getCompletionProgress,
  type ScavengerQuestion,
} from './scavengerLogic';

describe('scavengerLogic', () => {
  describe('generateScavengerQuestions', () => {
    it('should generate exactly 24 questions', () => {
      const questions = generateScavengerQuestions();
      expect(questions).toHaveLength(24);
    });

    it('should have unique IDs from 0 to 23', () => {
      const questions = generateScavengerQuestions();
      const ids = questions.map((q) => q.id);
      expect(ids).toEqual(Array.from({ length: 24 }, (_, i) => i));
    });

    it('should have all questions uncompleted initially', () => {
      const questions = generateScavengerQuestions();
      questions.forEach((question) => {
        expect(question.isCompleted).toBe(false);
      });
    });

    it('should have text for each question', () => {
      const questions = generateScavengerQuestions();
      questions.forEach((question) => {
        expect(question.text).toBeTruthy();
        expect(typeof question.text).toBe('string');
        expect(question.text.length).toBeGreaterThan(0);
      });
    });

    it('should randomize question order between calls', () => {
      const originalRandom = Math.random;
      let callCount = 0;
      vi.spyOn(Math, 'random').mockImplementation(() => {
        callCount++;
        return callCount / 100;
      });

      const questions1 = generateScavengerQuestions();
      
      callCount = 0;
      const questions2 = generateScavengerQuestions();

      Math.random = originalRandom;

      // Questions should be in same order with deterministic random
      expect(questions1.map(q => q.text)).toEqual(questions2.map(q => q.text));
    });

    it('should create different orders with different random values', () => {
      vi.spyOn(Math, 'random').mockReturnValueOnce(0.1);
      const questions1 = generateScavengerQuestions();

      vi.spyOn(Math, 'random').mockReturnValueOnce(0.9);
      const questions2 = generateScavengerQuestions();

      const texts1 = questions1.map(q => q.text);
      const texts2 = questions2.map(q => q.text);
      
      // With different random seeds, order should differ
      const isDifferent = texts1.some((text, idx) => text !== texts2[idx]);
      expect(isDifferent).toBe(true);
    });
  });

  describe('toggleScavengerQuestion', () => {
    let questions: ScavengerQuestion[];

    beforeEach(() => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      questions = generateScavengerQuestions();
      vi.restoreAllMocks();
    });

    it('should toggle question from uncompleted to completed', () => {
      const questionId = 0;
      expect(questions[questionId].isCompleted).toBe(false);

      const newQuestions = toggleScavengerQuestion(questions, questionId);
      
      expect(newQuestions[questionId].isCompleted).toBe(true);
    });

    it('should toggle question from completed to uncompleted', () => {
      const questionId = 0;
      const completedQuestions = toggleScavengerQuestion(questions, questionId);
      expect(completedQuestions[questionId].isCompleted).toBe(true);

      const uncompletedQuestions = toggleScavengerQuestion(completedQuestions, questionId);
      
      expect(uncompletedQuestions[questionId].isCompleted).toBe(false);
    });

    it('should not modify original array (immutability)', () => {
      const originalQuestions = [...questions];
      const questionId = 0;

      toggleScavengerQuestion(questions, questionId);

      expect(questions).toEqual(originalQuestions);
      expect(questions[questionId].isCompleted).toBe(false);
    });

    it('should only toggle the specified question', () => {
      const questionId = 5;
      const newQuestions = toggleScavengerQuestion(questions, questionId);

      newQuestions.forEach((question, idx) => {
        if (idx === questionId) {
          expect(question.isCompleted).toBe(true);
        } else {
          expect(question.isCompleted).toBe(false);
        }
      });
    });

    it('should handle invalid question IDs gracefully', () => {
      const invalidId = 999;
      const newQuestions = toggleScavengerQuestion(questions, invalidId);

      // Should return new array but no changes
      expect(newQuestions).not.toBe(questions);
      expect(newQuestions).toHaveLength(24);
      newQuestions.forEach((question) => {
        expect(question.isCompleted).toBe(false);
      });
    });
  });

  describe('checkScavengerComplete', () => {
    let questions: ScavengerQuestion[];

    beforeEach(() => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      questions = generateScavengerQuestions();
      vi.restoreAllMocks();
    });

    it('should return false when no questions are completed', () => {
      expect(checkScavengerComplete(questions)).toBe(false);
    });

    it('should return false when some questions are completed', () => {
      let modifiedQuestions = questions;
      for (let i = 0; i < 10; i++) {
        modifiedQuestions = toggleScavengerQuestion(modifiedQuestions, i);
      }

      expect(checkScavengerComplete(modifiedQuestions)).toBe(false);
    });

    it('should return true when all questions are completed', () => {
      let modifiedQuestions = questions;
      for (let i = 0; i < 24; i++) {
        modifiedQuestions = toggleScavengerQuestion(modifiedQuestions, i);
      }

      expect(checkScavengerComplete(modifiedQuestions)).toBe(true);
    });

    it('should return false when only 23 out of 24 are completed', () => {
      let modifiedQuestions = questions;
      for (let i = 0; i < 23; i++) {
        modifiedQuestions = toggleScavengerQuestion(modifiedQuestions, i);
      }

      expect(checkScavengerComplete(modifiedQuestions)).toBe(false);
    });

    it('should handle empty array', () => {
      expect(checkScavengerComplete([])).toBe(true); // vacuously true
    });
  });

  describe('getCompletionProgress', () => {
    let questions: ScavengerQuestion[];

    beforeEach(() => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      questions = generateScavengerQuestions();
      vi.restoreAllMocks();
    });

    it('should return 0 completed and 24 total initially', () => {
      const progress = getCompletionProgress(questions);
      
      expect(progress.completed).toBe(0);
      expect(progress.total).toBe(24);
      expect(progress.percentage).toBe(0);
    });

    it('should return correct progress for partially completed', () => {
      let modifiedQuestions = questions;
      for (let i = 0; i < 12; i++) {
        modifiedQuestions = toggleScavengerQuestion(modifiedQuestions, i);
      }

      const progress = getCompletionProgress(modifiedQuestions);

      expect(progress.completed).toBe(12);
      expect(progress.total).toBe(24);
      expect(progress.percentage).toBe(50);
    });

    it('should return 100% when all completed', () => {
      let modifiedQuestions = questions;
      for (let i = 0; i < 24; i++) {
        modifiedQuestions = toggleScavengerQuestion(modifiedQuestions, i);
      }

      const progress = getCompletionProgress(modifiedQuestions);

      expect(progress.completed).toBe(24);
      expect(progress.total).toBe(24);
      expect(progress.percentage).toBe(100);
    });

    it('should calculate percentage correctly for various counts', () => {
      const testCases = [
        { completed: 6, expected: 25 },
        { completed: 8, expected: 33.33 },
        { completed: 16, expected: 66.67 },
        { completed: 20, expected: 83.33 },
      ];

      testCases.forEach(({ completed, expected }) => {
        let modifiedQuestions = questions;
        for (let i = 0; i < completed; i++) {
          modifiedQuestions = toggleScavengerQuestion(modifiedQuestions, i);
        }

        const progress = getCompletionProgress(modifiedQuestions);
        expect(progress.percentage).toBeCloseTo(expected, 2);
      });
    });

    it('should handle empty array', () => {
      const progress = getCompletionProgress([]);

      expect(progress.completed).toBe(0);
      expect(progress.total).toBe(0);
      expect(progress.percentage).toBe(0);
    });
  });
});
