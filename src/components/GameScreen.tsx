import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="relative flex flex-col min-h-full overflow-hidden">
      {/* Cosmic background gradient */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(157, 78, 221, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(0, 240, 255, 0.2) 0%, transparent 50%),
            linear-gradient(180deg, #1a0b2e 0%, #0a0118 100%)
          `,
        }}
      />

      {/* Header */}
      <header
        className="relative z-10 flex items-center justify-between p-4 backdrop-blur-md"
        style={{
          background: 'rgba(26, 11, 46, 0.8)',
          borderBottom: '1px solid rgba(157, 78, 221, 0.3)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <button
          onClick={onReset}
          className="font-mono text-sm px-4 py-2 rounded-lg transition-all duration-300"
          style={{
            color: '#00f0ff',
            background: 'rgba(0, 240, 255, 0.1)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--glow-soft-cyan)';
            e.currentTarget.style.background = 'rgba(0, 240, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
          }}
        >
          ← BACK
        </button>
        <h1
          className="font-display text-xl font-bold tracking-wider"
          style={{
            color: '#00f0ff',
            textShadow: 'var(--glow-soft-cyan)',
          }}
        >
          SOC OPS
        </h1>
        <div className="w-20"></div>
      </header>

      {/* Instructions */}
      <p
        className="relative z-10 text-center font-mono text-sm py-3 px-4"
        style={{
          color: '#e0e0e0',
          textShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
        }}
      >
        Tap a square when you find someone who matches it.
      </p>

      {/* Bingo indicator with neon scroll effect */}
      {hasBingo && (
        <div
          className="relative z-10 text-center py-3 font-display font-bold text-base tracking-widest overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, rgba(255, 0, 229, 0.3) 0%, rgba(255, 215, 0, 0.3) 50%, rgba(255, 0, 229, 0.3) 100%)',
            backdropFilter: 'blur(10px)',
            border: '2px solid',
            borderImage: 'linear-gradient(90deg, #ff00e5, #ffd700, #ff00e5) 1',
            color: '#ffd700',
            textShadow: '0 0 20px #ffd700, 0 0 40px #ff00e5',
            animation: 'neon-flicker 1.5s ease-in-out infinite',
          }}
        >
          {/* Animated sweep overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
              animation: 'sweep-light 2s linear infinite',
            }}
          />
          <span className="relative">🎉 BINGO! YOU GOT A LINE! 🎉</span>
        </div>
      )}

      {/* Board */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
