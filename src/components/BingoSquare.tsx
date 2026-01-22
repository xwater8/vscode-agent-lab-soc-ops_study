import { useState } from 'react';
import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const [isRippling, setIsRippling] = useState(false);

  const handleClick = () => {
    if (!square.isFreeSpace) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 600);
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={square.isFreeSpace}
      className="relative flex items-center justify-center p-2 text-center rounded-lg select-none min-h-[70px] text-xs leading-tight font-mono transition-all duration-300 overflow-hidden"
      style={{
        background: square.isMarked
          ? isWinning
            ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 140, 0, 0.3) 100%)'
            : 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(157, 78, 221, 0.2) 100%)'
          : 'rgba(26, 11, 46, 0.6)',
        backdropFilter: 'blur(10px)',
        border: square.isMarked
          ? isWinning
            ? '2px solid #ffd700'
            : '2px solid var(--color-neon-cyan)'
          : '1px solid rgba(157, 78, 221, 0.3)',
        boxShadow: square.isMarked
          ? isWinning
            ? '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 140, 0, 0.4), inset 0 0 20px rgba(255, 215, 0, 0.2)'
            : 'var(--glow-soft-cyan), inset 0 0 15px rgba(0, 240, 255, 0.1)'
          : '0 0 5px rgba(157, 78, 221, 0.2)',
        color: '#ffffff',
        transform: square.isMarked && !square.isFreeSpace ? 'scale(0.98)' : 'scale(1)',
        animation: square.isMarked
          ? isWinning
            ? 'border-glow 2s ease-in-out infinite'
            : 'border-glow 3s ease-in-out infinite'
          : 'none',
      }}
      onMouseEnter={(e) => {
        if (!square.isFreeSpace && !square.isMarked) {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
          e.currentTarget.style.boxShadow = 'var(--glow-soft-magenta), 0 8px 20px rgba(157, 78, 221, 0.3)';
          e.currentTarget.style.borderColor = 'var(--color-neon-magenta)';
        }
      }}
      onMouseLeave={(e) => {
        if (!square.isFreeSpace && !square.isMarked) {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 0 5px rgba(157, 78, 221, 0.2)';
          e.currentTarget.style.borderColor = 'rgba(157, 78, 221, 0.3)';
        }
      }}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      {/* Ripple effect */}
      {isRippling && (
        <span
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.6) 0%, transparent 70%)',
            animation: 'ripple 0.6s ease-out',
          }}
        />
      )}

      {/* Star burst effect for winning squares */}
      {isWinning && square.isMarked && (
        <>
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, #ffd700 0%, #ff8c00 100%)',
                top: '50%',
                left: '50%',
                animation: `star-burst 2s ease-out infinite`,
                animationDelay: `${i * 0.1}s`,
                transform: `rotate(${i * 45}deg) translateX(0)`,
              }}
            />
          ))}
        </>
      )}

      {/* Text content */}
      <span
        className="relative z-10 wrap-break-word hyphens-auto"
        style={{
          fontWeight: square.isFreeSpace ? 'bold' : 'normal',
          fontSize: square.isFreeSpace ? '0.875rem' : '0.75rem',
          textShadow: square.isMarked
            ? '0 0 10px rgba(0, 240, 255, 0.5)'
            : '0 1px 2px rgba(0, 0, 0, 0.5)',
        }}
      >
        {square.text}
      </span>

      {/* Checkmark for marked squares */}
      {square.isMarked && !square.isFreeSpace && (
        <span
          className="absolute top-1 right-1 font-bold text-base"
          style={{
            color: isWinning ? '#ffd700' : '#00f0ff',
            textShadow: isWinning
              ? '0 0 10px #ffd700'
              : '0 0 10px #00f0ff',
            animation: 'scale-bounce 0.4s ease-out',
          }}
        >
          ✓
        </span>
      )}

      {/* Animated glow overlay on hover */}
      {!square.isFreeSpace && !square.isMarked && (
        <span
          className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, transparent 0%, rgba(255, 0, 229, 0.1) 50%, transparent 100%)',
          }}
        />
      )}
    </button>
  );
}
