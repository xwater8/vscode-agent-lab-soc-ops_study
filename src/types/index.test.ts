import { describe, it, expect } from 'vitest';
import type { ScavengerQuestion, GameMode, GameState } from './index';

describe('Type Definitions - Scavenger Hunt', () => {
  describe('ScavengerQuestion', () => {
    it('should have correct structure', () => {
      const question: ScavengerQuestion = {
        id: 0,
        text: 'has a pet',
        isCompleted: false,
      };

      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('text');
      expect(question).toHaveProperty('isCompleted');
      expect(typeof question.id).toBe('number');
      expect(typeof question.text).toBe('string');
      expect(typeof question.isCompleted).toBe('boolean');
    });

    it('should allow completed state', () => {
      const question: ScavengerQuestion = {
        id: 1,
        text: 'plays an instrument',
        isCompleted: true,
      };

      expect(question.isCompleted).toBe(true);
    });

    it('should support any valid id number', () => {
      const questions: ScavengerQuestion[] = [
        { id: 0, text: 'test 0', isCompleted: false },
        { id: 23, text: 'test 23', isCompleted: false },
        { id: 999, text: 'test 999', isCompleted: false },
      ];

      questions.forEach((q) => {
        expect(typeof q.id).toBe('number');
      });
    });

    it('should support any text content', () => {
      const questions: ScavengerQuestion[] = [
        { id: 0, text: 'short', isCompleted: false },
        { id: 1, text: 'a very long question text that describes something in detail', isCompleted: false },
        { id: 2, text: 'has special chars: 🎯 & symbols!', isCompleted: false },
      ];

      questions.forEach((q) => {
        expect(typeof q.text).toBe('string');
        expect(q.text.length).toBeGreaterThan(0);
      });
    });
  });

  describe('GameMode', () => {
    it('should accept "bingo" value', () => {
      const mode: GameMode = 'bingo';
      expect(mode).toBe('bingo');
    });

    it('should accept "scavenger" value', () => {
      const mode: GameMode = 'scavenger';
      expect(mode).toBe('scavenger');
    });

    it('should be used in state objects', () => {
      interface GameModeState {
        currentMode: GameMode;
      }

      const state1: GameModeState = { currentMode: 'bingo' };
      const state2: GameModeState = { currentMode: 'scavenger' };

      expect(['bingo', 'scavenger']).toContain(state1.currentMode);
      expect(['bingo', 'scavenger']).toContain(state2.currentMode);
    });
  });

  describe('GameState - Extended', () => {
    it('should accept original bingo states', () => {
      const states: GameState[] = ['start', 'playing', 'bingo'];
      
      states.forEach((state) => {
        expect(['start', 'playing', 'bingo', 'scavenger-playing', 'scavenger-complete']).toContain(state);
      });
    });

    it('should accept "scavenger-playing" state', () => {
      const state: GameState = 'scavenger-playing';
      expect(state).toBe('scavenger-playing');
    });

    it('should accept "scavenger-complete" state', () => {
      const state: GameState = 'scavenger-complete';
      expect(state).toBe('scavenger-complete');
    });

    it('should support state transitions', () => {
      const stateFlow: GameState[] = [
        'start',
        'scavenger-playing',
        'scavenger-complete',
        'start',
      ];

      stateFlow.forEach((state) => {
        expect(typeof state).toBe('string');
      });
    });

    it('should distinguish between completion states', () => {
      const bingoComplete: GameState = 'bingo';
      const scavengerComplete: GameState = 'scavenger-complete';

      expect(bingoComplete).not.toBe(scavengerComplete);
      expect(bingoComplete).toBe('bingo');
      expect(scavengerComplete).toBe('scavenger-complete');
    });
  });

  describe('Type Compatibility', () => {
    it('should work with arrays of ScavengerQuestion', () => {
      const questions: ScavengerQuestion[] = [
        { id: 0, text: 'first', isCompleted: false },
        { id: 1, text: 'second', isCompleted: true },
        { id: 2, text: 'third', isCompleted: false },
      ];

      expect(Array.isArray(questions)).toBe(true);
      expect(questions).toHaveLength(3);
      expect(questions.every((q) => 'id' in q && 'text' in q && 'isCompleted' in q)).toBe(true);
    });

    it('should work in complex state objects', () => {
      interface AppState {
        gameState: GameState;
        gameMode: GameMode;
        scavengerQuestions: ScavengerQuestion[];
      }

      const state: AppState = {
        gameState: 'scavenger-playing',
        gameMode: 'scavenger',
        scavengerQuestions: [
          { id: 0, text: 'test', isCompleted: false },
        ],
      };

      expect(state.gameState).toBe('scavenger-playing');
      expect(state.gameMode).toBe('scavenger');
      expect(state.scavengerQuestions).toHaveLength(1);
    });

    it('should support optional fields in extended interfaces', () => {
      interface ExtendedQuestion extends ScavengerQuestion {
        category?: string;
        difficulty?: number;
      }

      const question: ExtendedQuestion = {
        id: 0,
        text: 'has a pet',
        isCompleted: false,
        category: 'personal',
        difficulty: 1,
      };

      expect(question.category).toBe('personal');
      expect(question.difficulty).toBe(1);
    });
  });

  describe('Type Guards (runtime checks)', () => {
    it('should validate ScavengerQuestion structure', () => {
      function isScavengerQuestion(obj: unknown): obj is ScavengerQuestion {
        return (
          typeof obj === 'object' &&
          obj !== null &&
          'id' in obj &&
          'text' in obj &&
          'isCompleted' in obj &&
          typeof (obj as ScavengerQuestion).id === 'number' &&
          typeof (obj as ScavengerQuestion).text === 'string' &&
          typeof (obj as ScavengerQuestion).isCompleted === 'boolean'
        );
      }

      const valid = { id: 0, text: 'test', isCompleted: false };
      const invalid1 = { id: '0', text: 'test', isCompleted: false };
      const invalid2 = { id: 0, text: 123, isCompleted: false };
      const invalid3 = { id: 0, text: 'test' };

      expect(isScavengerQuestion(valid)).toBe(true);
      expect(isScavengerQuestion(invalid1)).toBe(false);
      expect(isScavengerQuestion(invalid2)).toBe(false);
      expect(isScavengerQuestion(invalid3)).toBe(false);
    });

    it('should validate GameMode values', () => {
      function isGameMode(value: unknown): value is GameMode {
        return value === 'bingo' || value === 'scavenger';
      }

      expect(isGameMode('bingo')).toBe(true);
      expect(isGameMode('scavenger')).toBe(true);
      expect(isGameMode('invalid')).toBe(false);
      expect(isGameMode(123)).toBe(false);
      expect(isGameMode(null)).toBe(false);
    });

    it('should validate GameState values', () => {
      function isGameState(value: unknown): value is GameState {
        return (
          value === 'start' ||
          value === 'playing' ||
          value === 'bingo' ||
          value === 'scavenger-playing' ||
          value === 'scavenger-complete'
        );
      }

      expect(isGameState('start')).toBe(true);
      expect(isGameState('playing')).toBe(true);
      expect(isGameState('bingo')).toBe(true);
      expect(isGameState('scavenger-playing')).toBe(true);
      expect(isGameState('scavenger-complete')).toBe(true);
      expect(isGameState('invalid')).toBe(false);
      expect(isGameState('scavenger')).toBe(false);
    });
  });
});
