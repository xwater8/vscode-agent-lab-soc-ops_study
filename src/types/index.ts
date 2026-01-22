/** Domain types for the Bingo game */

export interface BingoSquareData {
  id: number;
  text: string;
  isMarked: boolean;
  isFreeSpace: boolean;
}

export interface BingoLine {
  type: 'row' | 'column' | 'diagonal';
  index: number;
  squares: number[];
}

export interface ScavengerQuestion {
  id: number;
  text: string;
  isCompleted: boolean;
}

export type GameMode = 'bingo' | 'scavenger';

export type GameState = 'start' | 'playing' | 'bingo' | 'scavenger-playing' | 'scavenger-complete';
