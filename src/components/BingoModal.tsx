interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  // Generate random particle positions
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 30,
    distance: 100 + Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 1,
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* Backdrop with radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 0, 229, 0.2) 0%, rgba(10, 1, 24, 0.95) 70%)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={onDismiss}
      />

      {/* Particle explosion effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                particle.id % 3 === 0 ? '#00f0ff' : particle.id % 3 === 1 ? '#ff00e5' : '#ffd700'
              } 0%, transparent 70%)`,
              animation: `particle-float ${particle.duration}s ease-out ${particle.delay}s infinite`,
              '--tx': `${Math.cos((particle.angle * Math.PI) / 180) * particle.distance}px`,
              '--ty': `${Math.sin((particle.angle * Math.PI) / 180) * particle.distance}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Modal card */}
      <div
        className="relative max-w-md w-full text-center backdrop-blur-xl rounded-3xl p-10 overflow-hidden"
        style={{
          background: 'rgba(26, 11, 46, 0.9)',
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, #00f0ff, #ff00e5, #ffd700) 1',
          boxShadow: '0 0 60px rgba(255, 0, 229, 0.6), 0 0 100px rgba(0, 240, 255, 0.4), inset 0 0 60px rgba(157, 78, 221, 0.2)',
          animation: 'scale-bounce 0.6s ease-out',
        }}
      >
        {/* Rotating glow ring */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg, transparent, #00f0ff, transparent, #ff00e5, transparent)',
            animation: 'spin-glow 4s linear infinite',
          }}
        />

        {/* Celebration emoji with spin */}
        <div
          className="text-8xl mb-6 relative inline-block"
          style={{
            filter: 'drop-shadow(0 0 20px #ffd700)',
            animation: 'spin-glow 2s ease-in-out infinite',
          }}
        >
          🎉
        </div>

        {/* Title with neon pulse */}
        <h2
          className="font-display text-6xl font-black mb-4 tracking-widest relative"
          style={{
            background: 'linear-gradient(135deg, #00f0ff 0%, #ff00e5 50%, #ffd700 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(255, 215, 0, 0.8)',
            animation: 'glow-pulse 2s ease-in-out infinite',
          }}
        >
          BINGO!
        </h2>

        {/* Subtitle */}
        <p
          className="font-mono text-lg mb-8 relative"
          style={{
            color: '#e0e0e0',
            textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
          }}
        >
          You completed a line!
        </p>

        {/* Dismiss button with neon border */}
        <button
          onClick={onDismiss}
          className="relative w-full font-display text-xl font-bold py-4 px-8 rounded-xl overflow-hidden transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(157, 78, 221, 0.2) 100%)',
            border: '2px solid var(--color-neon-cyan)',
            color: '#00f0ff',
            boxShadow: 'var(--glow-soft-cyan)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 240, 255, 0.3) 0%, rgba(157, 78, 221, 0.3) 100%)';
            e.currentTarget.style.boxShadow = 'var(--glow-cyan)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(157, 78, 221, 0.2) 100%)';
            e.currentTarget.style.boxShadow = 'var(--glow-soft-cyan)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {/* Sweep effect */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
              animation: 'sweep-light 2s ease-in-out infinite',
            }}
          />
          <span className="relative tracking-wider">KEEP PLAYING</span>
        </button>
      </div>
    </div>
  );
}
