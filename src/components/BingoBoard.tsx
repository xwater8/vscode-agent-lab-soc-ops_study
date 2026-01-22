import type { BingoSquareData } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-2xl opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(0, 240, 255, 0.1) 70%, transparent 100%)',
          filter: 'blur(20px)',
          animation: 'glow-pulse 4s ease-in-out infinite',
        }}
      />

      {/* Board grid with staggered animation */}
      <div
        className="relative grid grid-cols-5 gap-2 w-full aspect-square p-2 rounded-2xl backdrop-blur-sm"
        style={{
          background: 'rgba(45, 27, 78, 0.3)',
          border: '1px solid rgba(157, 78, 221, 0.2)',
          boxShadow: 'inset 0 0 30px rgba(157, 78, 221, 0.1)',
        }}
      >
        {board.map((square, index) => (
          <div
            key={square.id}
            style={{
              animation: `float-up 0.6s ease-out ${index * 0.03}s backwards`,
            }}
          >
            <BingoSquare
              square={square}
              isWinning={winningSquareIds.has(square.id)}
              onClick={() => onSquareClick(square.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
