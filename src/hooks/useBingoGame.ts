import { useState, useCallback, useMemo, useEffect } from 'react';
import type { BingoSquareData, BingoLine, GameState, GameMode, ScavengerQuestion } from '../types';
import {
  generateBoard,
  toggleSquare,
  checkBingo,
  getWinningSquareIds,
} from '../utils/bingoLogic';
import {
  generateScavengerQuestions,
  toggleScavengerQuestion,
  checkScavengerComplete,
} from '../utils/scavengerLogic';

export interface BingoGameState {
  gameState: GameState;
  gameMode: GameMode;
  board: BingoSquareData[];
  scavengerQuestions: ScavengerQuestion[];
  winningLine: BingoLine | null;
  winningSquareIds: Set<number>;
  showBingoModal: boolean;
  showScavengerModal: boolean;
}

export interface BingoGameActions {
  startGame: () => void;
  startScavengerHunt: () => void;
  handleSquareClick: (squareId: number) => void;
  toggleScavengerQuestion: (questionId: number) => void;
  resetGame: () => void;
  dismissModal: () => void;
  dismissScavengerModal: () => void;
}

const STORAGE_KEY = 'bingo-game-state';
const STORAGE_VERSION = 2;

interface StoredGameData {
  version: number;
  gameState: GameState;
  gameMode: GameMode;
  board: BingoSquareData[];
  scavengerQuestions: ScavengerQuestion[];
  winningLine: BingoLine | null;
}

const VALID_GAME_STATES: GameState[] = ['start', 'playing', 'bingo', 'scavenger-playing', 'scavenger-complete'];
const BINGO_BOARD_SIZE = 25;

function isValidBingoSquare(sq: unknown): boolean {
  if (!sq || typeof sq !== 'object') return false;
  const square = sq as Record<string, unknown>;
  return (
    typeof square.id === 'number' &&
    typeof square.text === 'string' &&
    typeof square.isMarked === 'boolean' &&
    typeof square.isFreeSpace === 'boolean'
  );
}

function isValidWinningLine(line: unknown): boolean {
  if (line === null) return true;
  if (!line || typeof line !== 'object') return false;
  
  const lineObj = line as Record<string, unknown>;
  return (
    typeof lineObj.type === 'string' &&
    ['row', 'column', 'diagonal'].includes(lineObj.type) &&
    typeof lineObj.index === 'number' &&
    Array.isArray(lineObj.squares)
  );
}

function validateStoredData(data: unknown): data is StoredGameData {
  if (!data || typeof data !== 'object') return false;
  
  const obj = data as Record<string, unknown>;
  
  // Allow both v1 and v2, will migrate v1
  if (obj.version !== STORAGE_VERSION && obj.version !== 1) return false;
  
  if (typeof obj.gameState !== 'string' || !VALID_GAME_STATES.includes(obj.gameState as GameState)) {
    return false;
  }
  
  if (!Array.isArray(obj.board) || (obj.board.length !== 0 && obj.board.length !== BINGO_BOARD_SIZE)) {
    return false;
  }
  
  if (!obj.board.every(isValidBingoSquare)) return false;
  
  return isValidWinningLine(obj.winningLine);
}

function loadGameState(): Partial<BingoGameState> | null {
  // SSR guard
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved) as unknown;
    
    if (validateStoredData(parsed)) {
      // Migrate v1 to v2
      if (parsed.version === 1) {
        return {
          gameState: parsed.gameState,
          gameMode: 'bingo',
          board: parsed.board,
          scavengerQuestions: [],
          winningLine: parsed.winningLine,
        };
      }
      
      return {
        gameState: parsed.gameState,
        gameMode: parsed.gameMode,
        board: parsed.board,
        scavengerQuestions: parsed.scavengerQuestions,
        winningLine: parsed.winningLine,
      };
    } else {
      console.warn('Invalid game state data in localStorage, clearing...');
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to load game state:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return null;
}

function saveGameState(
  gameState: GameState,
  gameMode: GameMode,
  board: BingoSquareData[],
  scavengerQuestions: ScavengerQuestion[],
  winningLine: BingoLine | null
): void {
  // SSR guard
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StoredGameData = {
      version: STORAGE_VERSION,
      gameState,
      gameMode,
      board,
      scavengerQuestions,
      winningLine,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save game state:', error);
  }
}

export function useBingoGame(): BingoGameState & BingoGameActions {
  const loadedState = useMemo(() => loadGameState(), []);

  const [gameState, setGameState] = useState<GameState>(
    () => loadedState?.gameState || 'start'
  );
  const [gameMode, setGameMode] = useState<GameMode>(
    () => loadedState?.gameMode || 'bingo'
  );
  const [board, setBoard] = useState<BingoSquareData[]>(
    () => loadedState?.board || []
  );
  const [scavengerQuestions, setScavengerQuestions] = useState<ScavengerQuestion[]>(
    () => loadedState?.scavengerQuestions || []
  );
  const [winningLine, setWinningLine] = useState<BingoLine | null>(
    () => loadedState?.winningLine || null
  );
  const [showBingoModal, setShowBingoModal] = useState(false);
  const [showScavengerModal, setShowScavengerModal] = useState(false);

  const winningSquareIds = useMemo(
    () => getWinningSquareIds(winningLine),
    [winningLine]
  );

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameState, gameMode, board, scavengerQuestions, winningLine);
  }, [gameState, gameMode, board, scavengerQuestions, winningLine]);

  const startGame = useCallback(() => {
    setBoard(generateBoard());
    setWinningLine(null);
    setGameState('playing');
    setGameMode('bingo');
  }, []);

  const startScavengerHunt = useCallback(() => {
    setScavengerQuestions(generateScavengerQuestions());
    setGameState('scavenger-playing');
    setGameMode('scavenger');
  }, []);

  const handleSquareClick = useCallback((squareId: number) => {
    setBoard((currentBoard) => {
      const newBoard = toggleSquare(currentBoard, squareId);
      
      // Check for bingo after toggling
      const bingo = checkBingo(newBoard);
      if (bingo && !winningLine) {
        // Schedule state updates to avoid synchronous setState in effect
        queueMicrotask(() => {
          setWinningLine(bingo);
          setGameState('bingo');
          setShowBingoModal(true);
        });
      }
      
      return newBoard;
    });
  }, [winningLine]);

  const toggleScavengerQuestionHandler = useCallback((questionId: number) => {
    setScavengerQuestions((currentQuestions) => {
      const newQuestions = toggleScavengerQuestion(currentQuestions, questionId);
      
      // Check for completion
      const isComplete = checkScavengerComplete(newQuestions);
      if (isComplete) {
        queueMicrotask(() => {
          setGameState('scavenger-complete');
          setShowScavengerModal(true);
        });
      }
      
      return newQuestions;
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState('start');
    setBoard([]);
    setScavengerQuestions([]);
    setWinningLine(null);
    setShowBingoModal(false);
    setShowScavengerModal(false);
  }, []);

  const dismissModal = useCallback(() => {
    setShowBingoModal(false);
  }, []);

  const dismissScavengerModal = useCallback(() => {
    setShowScavengerModal(false);
  }, []);

  return {
    gameState,
    gameMode,
    board,
    scavengerQuestions,
    winningLine,
    winningSquareIds,
    showBingoModal,
    showScavengerModal,
    startGame,
    startScavengerHunt,
    handleSquareClick,
    toggleScavengerQuestion: toggleScavengerQuestionHandler,
    resetGame,
    dismissModal,
    dismissScavengerModal,
  };
}
