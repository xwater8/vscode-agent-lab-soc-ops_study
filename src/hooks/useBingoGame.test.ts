import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBingoGame } from './useBingoGame';

describe('useBingoGame - Scavenger Hunt Mode', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initial State', () => {
    it('should include gameMode in initial state', () => {
      const { result } = renderHook(() => useBingoGame());

      expect(result.current.gameMode).toBeDefined();
      expect(['bingo', 'scavenger']).toContain(result.current.gameMode);
    });

    it('should include scavengerQuestions in state', () => {
      const { result } = renderHook(() => useBingoGame());

      expect(result.current.scavengerQuestions).toBeDefined();
      expect(Array.isArray(result.current.scavengerQuestions)).toBe(true);
    });

    it('should include showScavengerModal in state', () => {
      const { result } = renderHook(() => useBingoGame());

      expect(result.current.showScavengerModal).toBeDefined();
      expect(typeof result.current.showScavengerModal).toBe('boolean');
    });

    it('should have empty scavengerQuestions initially', () => {
      const { result } = renderHook(() => useBingoGame());

      expect(result.current.scavengerQuestions).toHaveLength(0);
    });

    it('should have showScavengerModal as false initially', () => {
      const { result } = renderHook(() => useBingoGame());

      expect(result.current.showScavengerModal).toBe(false);
    });
  });

  describe('startScavengerHunt Action', () => {
    it('should provide startScavengerHunt action', () => {
      const { result } = renderHook(() => useBingoGame());

      expect(result.current.startScavengerHunt).toBeDefined();
      expect(typeof result.current.startScavengerHunt).toBe('function');
    });

    it('should generate 24 scavenger questions when starting', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.scavengerQuestions).toHaveLength(24);
    });

    it('should set gameState to scavenger-playing', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.gameState).toBe('scavenger-playing');
    });

    it('should set gameMode to scavenger', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.gameMode).toBe('scavenger');
    });

    it('should clear any previous bingo board', () => {
      const { result } = renderHook(() => useBingoGame());

      // Start bingo first
      act(() => {
        result.current.startGame();
      });
      expect(result.current.board).toHaveLength(25);

      // Switch to scavenger
      act(() => {
        result.current.startScavengerHunt();
      });

      // Board should be cleared or irrelevant
      expect(result.current.gameState).not.toBe('playing');
      expect(result.current.gameMode).toBe('scavenger');
    });

    it('should randomize question order', () => {
      const { result: result1 } = renderHook(() => useBingoGame());
      act(() => {
        result1.current.startScavengerHunt();
      });
      const texts1 = result1.current.scavengerQuestions.map(q => q.text);

      // Create new hook instance with different random
      vi.spyOn(Math, 'random').mockReturnValue(0.1);
      const { result: result2 } = renderHook(() => useBingoGame());
      act(() => {
        result2.current.startScavengerHunt();
      });
      const texts2 = result2.current.scavengerQuestions.map(q => q.text);

      // Orders should differ (with different random seeds)
      const isDifferent = texts1.some((text, idx) => text !== texts2[idx]);
      expect(isDifferent).toBe(true);
    });
  });

  describe('toggleScavengerQuestion Action', () => {
    it('should provide toggleScavengerQuestion action', () => {
      const { result } = renderHook(() => useBingoGame());

      expect(result.current.toggleScavengerQuestion).toBeDefined();
      expect(typeof result.current.toggleScavengerQuestion).toBe('function');
    });

    it('should toggle question completion state', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      const questionId = result.current.scavengerQuestions[0].id;
      expect(result.current.scavengerQuestions[0].isCompleted).toBe(false);

      act(() => {
        result.current.toggleScavengerQuestion(questionId);
      });

      expect(result.current.scavengerQuestions[0].isCompleted).toBe(true);
    });

    it('should toggle back to uncompleted', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      const questionId = result.current.scavengerQuestions[0].id;

      act(() => {
        result.current.toggleScavengerQuestion(questionId);
      });
      expect(result.current.scavengerQuestions[0].isCompleted).toBe(true);

      act(() => {
        result.current.toggleScavengerQuestion(questionId);
      });
      expect(result.current.scavengerQuestions[0].isCompleted).toBe(false);
    });

    it('should detect completion when all 24 questions are done', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      // Complete all questions
      act(() => {
        result.current.scavengerQuestions.forEach((q) => {
          result.current.toggleScavengerQuestion(q.id);
        });
      });

      expect(result.current.gameState).toBe('scavenger-complete');
    });

    it('should show modal when hunt is complete', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.showScavengerModal).toBe(false);

      // Complete all questions
      act(() => {
        result.current.scavengerQuestions.forEach((q) => {
          result.current.toggleScavengerQuestion(q.id);
        });
      });

      expect(result.current.showScavengerModal).toBe(true);
    });

    it('should not trigger completion with 23/24 completed', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      // Complete 23 questions
      act(() => {
        for (let i = 0; i < 23; i++) {
          result.current.toggleScavengerQuestion(result.current.scavengerQuestions[i].id);
        }
      });

      expect(result.current.gameState).toBe('scavenger-playing');
      expect(result.current.showScavengerModal).toBe(false);
    });
  });

  describe('dismissScavengerModal Action', () => {
    it('should provide dismissScavengerModal action', () => {
      const { result } = renderHook(() => useBingoGame());

      expect(result.current.dismissScavengerModal).toBeDefined();
      expect(typeof result.current.dismissScavengerModal).toBe('function');
    });

    it('should hide scavenger modal when dismissed', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      // Complete all to show modal
      act(() => {
        result.current.scavengerQuestions.forEach((q) => {
          result.current.toggleScavengerQuestion(q.id);
        });
      });

      expect(result.current.showScavengerModal).toBe(true);

      act(() => {
        result.current.dismissScavengerModal();
      });

      expect(result.current.showScavengerModal).toBe(false);
    });
  });

  describe('resetGame with Scavenger Hunt', () => {
    it('should clear scavenger questions when resetting', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.scavengerQuestions).toHaveLength(24);

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.scavengerQuestions).toHaveLength(0);
      expect(result.current.gameState).toBe('start');
    });

    it('should hide scavenger modal when resetting', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      // Complete all to show modal
      act(() => {
        result.current.scavengerQuestions.forEach((q) => {
          result.current.toggleScavengerQuestion(q.id);
        });
      });

      expect(result.current.showScavengerModal).toBe(true);

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.showScavengerModal).toBe(false);
    });
  });

  describe('localStorage Persistence', () => {
    it('should save scavenger game state to localStorage', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      const stored = localStorage.getItem('bingo-game-state');
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored!);
      expect(parsed.version).toBe(2); // Updated version
      expect(parsed.gameMode).toBe('scavenger');
      expect(parsed.scavengerQuestions).toHaveLength(24);
    });

    it('should restore scavenger game state from localStorage', () => {
      const { result: result1 } = renderHook(() => useBingoGame());

      act(() => {
        result1.current.startScavengerHunt();
      });

      act(() => {
        result1.current.toggleScavengerQuestion(result1.current.scavengerQuestions[0].id);
        result1.current.toggleScavengerQuestion(result1.current.scavengerQuestions[1].id);
      });

      const firstQuestionText = result1.current.scavengerQuestions[0].text;

      // Create new hook instance (simulates page reload)
      const { result: result2 } = renderHook(() => useBingoGame());

      expect(result2.current.gameState).toBe('scavenger-playing');
      expect(result2.current.gameMode).toBe('scavenger');
      expect(result2.current.scavengerQuestions).toHaveLength(24);
      expect(result2.current.scavengerQuestions[0].isCompleted).toBe(true);
      expect(result2.current.scavengerQuestions[1].isCompleted).toBe(true);
      expect(result2.current.scavengerQuestions[2].isCompleted).toBe(false);
      expect(result2.current.scavengerQuestions[0].text).toBe(firstQuestionText);
    });

    it('should clear localStorage when resetting scavenger game', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      expect(localStorage.getItem('bingo-game-state')).toBeTruthy();

      act(() => {
        result.current.resetGame();
      });

      const stored = localStorage.getItem('bingo-game-state');
      const parsed = JSON.parse(stored!);
      expect(parsed.gameState).toBe('start');
      expect(parsed.scavengerQuestions).toHaveLength(0);
    });

    it('should handle version 1 data gracefully (migration)', () => {
      // Simulate old version 1 localStorage data
      const oldData = {
        version: 1,
        gameState: 'start',
        board: [],
        winningLine: null,
      };
      localStorage.setItem('bingo-game-state', JSON.stringify(oldData));

      const { result } = renderHook(() => useBingoGame());

      // Should load with defaults for new fields
      expect(result.current.gameState).toBe('start');
      expect(result.current.scavengerQuestions).toHaveLength(0);
      expect(result.current.gameMode).toBeDefined();
    });
  });

  describe('Mode Separation', () => {
    it('should not affect bingo board when playing scavenger', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame(); // Bingo mode
      });

      expect(result.current.board).toHaveLength(25);
      expect(result.current.gameMode).toBe('bingo');

      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.gameMode).toBe('scavenger');
      expect(result.current.scavengerQuestions).toHaveLength(24);
    });

    it('should not affect scavenger questions when playing bingo', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.scavengerQuestions).toHaveLength(24);
      expect(result.current.gameMode).toBe('scavenger');

      act(() => {
        result.current.startGame(); // Bingo mode
      });

      expect(result.current.gameMode).toBe('bingo');
      expect(result.current.board).toHaveLength(25);
    });
  });
});
