interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-full p-6 overflow-hidden">
      {/* Nebula Background Gradient */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(157, 78, 221, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(0, 240, 255, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(74, 26, 107, 0.5) 0%, transparent 70%),
            linear-gradient(180deg, #0a0118 0%, #1a0b2e 50%, #2d1b4e 100%)
          `
        }}
      />
      
      {/* Content Container with staggered fade-in */}
      <div className="relative z-10 text-center max-w-sm">
        {/* Title with glow pulse animation */}
        <h1 
          className="font-display text-6xl font-black mb-4 tracking-wider"
          style={{
            color: '#00f0ff',
            textShadow: 'var(--glow-cyan)',
            animation: 'glow-pulse 3s ease-in-out infinite, float-up 0.8s ease-out'
          }}
        >
          SOC OPS
        </h1>
        
        {/* Subtitle with delayed animation */}
        <p 
          className="font-display text-2xl mb-12 tracking-widest"
          style={{
            color: '#ff00e5',
            textShadow: 'var(--glow-magenta)',
            animation: 'float-up 0.8s ease-out 0.2s backwards'
          }}
        >
          SOCIAL BINGO
        </p>
        
        {/* Instructions card with backdrop blur and glow border */}
        <div 
          className="relative mb-12 rounded-2xl p-6 border-2 backdrop-blur-md overflow-hidden"
          style={{
            background: 'rgba(26, 11, 46, 0.7)',
            borderColor: 'var(--color-neon-purple)',
            boxShadow: 'var(--glow-soft-cyan)',
            animation: 'float-up 0.8s ease-out 0.4s backwards'
          }}
        >
          {/* Animated border glow */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-50"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(0, 240, 255, 0.2) 50%, transparent 70%)',
              animation: 'sweep-light 3s ease-in-out infinite'
            }}
          />
          
          <h2 className="font-display text-xl font-bold mb-4 relative" style={{ color: '#00d4ff' }}>
            HOW TO PLAY
          </h2>
          <ul className="text-left font-mono text-sm space-y-3 relative" style={{ color: '#e0e0e0' }}>
            <li className="flex items-start">
              <span className="text-neon-cyan mr-2">▸</span>
              Find people who match the questions
            </li>
            <li className="flex items-start">
              <span className="text-neon-magenta mr-2">▸</span>
              Tap a square when you find a match
            </li>
            <li className="flex items-start">
              <span className="text-neon-purple mr-2">▸</span>
              Get 5 in a row to win!
            </li>
          </ul>
        </div>

        {/* Start button with neon glow and sweep effect */}
        <button
          onClick={onStart}
          className="relative w-full font-display text-xl font-bold py-5 px-10 rounded-xl overflow-hidden transition-all duration-300 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #00f0ff 0%, #9d4edd 100%)',
            color: '#0a0118',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.6), 0 0 40px rgba(157, 78, 221, 0.4)',
            animation: 'float-up 0.8s ease-out 0.6s backwards'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.8), 0 0 60px rgba(157, 78, 221, 0.6)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.6), 0 0 40px rgba(157, 78, 221, 0.4)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {/* Animated light sweep */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
              animation: 'sweep-light 2s ease-in-out infinite'
            }}
          />
          <span className="relative tracking-wider">LAUNCH GAME</span>
        </button>
      </div>
    </div>
  );
}
