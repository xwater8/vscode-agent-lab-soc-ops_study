import { useMemo } from 'react';

export interface ScavengerCompleteModalProps {
  onDismiss: () => void;
  onPlayAgain: () => void;
}

export function ScavengerCompleteModal({ onDismiss, onPlayAgain }: ScavengerCompleteModalProps) {
  // Generate celebration particles with stable distribution
  const particles = useMemo(() => {
    const PARTICLE_COUNT = 20;
    const PARTICLE_DISTANCE = 200;
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const angle = (i * 360) / PARTICLE_COUNT * Math.PI / 180;
      return {
        id: i,
        tx: `${Math.cos(angle) * PARTICLE_DISTANCE}px`,
        ty: `${Math.sin(angle) * PARTICLE_DISTANCE}px`,
        delay: i * 0.025, // Staggered delay for sequential animation
      };
    });
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onDismiss();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(10, 1, 24, 0.8)' }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="scavenger-complete-title"
    >
      {/* Celebration Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            backgroundColor: particle.id % 3 === 0 ? '#00f0ff' : particle.id % 3 === 1 ? '#ff00e5' : '#9d4edd',
            boxShadow: `0 0 10px ${particle.id % 3 === 0 ? '#00f0ff' : particle.id % 3 === 1 ? '#ff00e5' : '#9d4edd'}`,
            animation: `particle-float 2s ease-out ${particle.delay}s`,
            ['--tx' as string]: particle.tx,
            ['--ty' as string]: particle.ty,
          }}
        />
      ))}

      {/* Modal Content */}
      <div
        className="relative max-w-md w-full rounded-3xl p-8 border-2 backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(26, 11, 46, 0.95)',
          borderColor: '#00f0ff',
          boxShadow: 'var(--glow-cyan)',
          animation: 'scale-bounce 0.6s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Rotating Glow Effect */}
        <div
          className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg, #00f0ff, #ff00e5, #9d4edd, #00f0ff)',
            animation: 'spin-glow 4s linear infinite',
            filter: 'blur(20px)',
          }}
        />

        {/* Title */}
        <h2
          id="scavenger-complete-title"
          className="relative font-display text-4xl font-black text-center mb-4 tracking-wider"
          style={{
            color: '#00f0ff',
            textShadow: 'var(--glow-cyan)',
            animation: 'glow-pulse 2s ease-in-out infinite',
          }}
        >
          HUNT COMPLETE!
        </h2>

        {/* Message */}
        <p
          className="relative font-mono text-center text-lg mb-6"
          style={{
            color: '#ff00e5',
            textShadow: 'var(--glow-soft-magenta)',
          }}
        >
          Awesome work! You've found all <strong>24</strong> items!
        </p>

        {/* Buttons */}
        <div className="relative flex flex-col gap-3">
          <button
            onClick={onPlayAgain}
            className="w-full py-3 rounded-xl border-2 font-display font-bold text-lg tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'rgba(0, 240, 255, 0.2)',
              borderColor: '#00f0ff',
              color: '#00f0ff',
              textShadow: 'var(--glow-soft-cyan)',
              boxShadow: 'var(--glow-soft-cyan)',
            }}
          >
            🔍 NEW HUNT
          </button>

          <button
            onClick={onDismiss}
            className="w-full py-3 rounded-xl border-2 font-display font-bold text-lg tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'rgba(157, 78, 221, 0.2)',
              borderColor: '#9d4edd',
              color: '#9d4edd',
              textShadow: 'var(--glow-soft-magenta)',
              boxShadow: 'var(--glow-soft-magenta)',
            }}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScavengerCompleteModal;
