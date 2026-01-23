interface StartScreenProps {
  onStartBingo: () => void;
  onStartScavenger: () => void;
}

export function StartScreen({ onStartBingo, onStartScavenger }: StartScreenProps) {
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
          className="relative mb-8 rounded-2xl p-6 border-2 backdrop-blur-md overflow-hidden"
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
          
          <h2 className="font-display text-xl font-bold mb-3 relative" style={{ color: '#00d4ff' }}>
            CHOOSE YOUR MODE
          </h2>
          <p className="text-sm font-mono mb-4 relative" style={{ color: '#e0e0e0' }}>
            Same questions, different gameplay styles
          </p>
        </div>

        {/* Mode Selection Buttons */}
        <div className="space-y-4">
          {/* BINGO MODE Button */}
          <button
            onClick={onStartBingo}
            className="relative w-full font-display text-lg font-bold py-5 px-8 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border-2"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(157, 78, 221, 0.2) 100%)',
              borderColor: '#00f0ff',
              color: '#00f0ff',
              textShadow: 'var(--glow-soft-cyan)',
              boxShadow: 'var(--glow-soft-cyan)',
              animation: 'float-up 0.8s ease-out 0.6s backwards, border-glow 3s ease-in-out infinite'
            }}
          >
            <span className="relative tracking-wider">🎯 BINGO MODE</span>
            <div className="text-xs font-mono mt-1 opacity-80">5×5 grid • Get 5 in a row</div>
          </button>

          {/* SCAVENGER HUNT Button */}
          <button
            onClick={onStartScavenger}
            className="relative w-full font-display text-lg font-bold py-5 px-8 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border-2"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 0, 229, 0.2) 0%, rgba(157, 78, 221, 0.2) 100%)',
              borderColor: '#ff00e5',
              color: '#ff00e5',
              textShadow: 'var(--glow-soft-magenta)',
              boxShadow: 'var(--glow-soft-magenta)',
              animation: 'float-up 0.8s ease-out 0.7s backwards'
            }}
          >
            <span className="relative tracking-wider">📋 SCAVENGER HUNT</span>
            <div className="text-xs font-mono mt-1 opacity-80">List with checkboxes • Find all 24</div>
          </button>
        </div>
      </div>
    </div>
  );
}
