import { ITEM_ANIMATION_DELAY } from '../utils/scavengerLogic';

interface ScavengerListItemProps {
  id: number;
  text: string;
  isCompleted: boolean;
  onToggle: (id: number) => void;
}

export function ScavengerListItem({ id, text, isCompleted, onToggle }: ScavengerListItemProps) {
  return (
    <label 
      className="flex items-center gap-4 p-4 rounded-lg border-2 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={{
        backgroundColor: isCompleted ? 'rgba(0, 240, 255, 0.1)' : 'rgba(26, 11, 46, 0.6)',
        borderColor: isCompleted ? '#00f0ff' : '#9d4edd',
        boxShadow: isCompleted ? 'var(--glow-soft-cyan)' : 'none',
        animation: 'float-up 0.5s ease-out backwards',
        animationDelay: `${id * ITEM_ANIMATION_DELAY}s`,
      }}
      onClick={() => onToggle(id)}
    >
      {/* Custom Checkbox */}
      <div 
        className="relative flex items-center justify-center w-6 h-6 rounded border-2 flex-shrink-0 transition-all duration-300"
        style={{
          borderColor: isCompleted ? '#00f0ff' : '#9d4edd',
          backgroundColor: isCompleted ? '#00f0ff' : 'transparent',
          boxShadow: isCompleted ? '0 0 10px #00f0ff' : 'none',
        }}
      >
        <input 
          type="checkbox" 
          checked={isCompleted}
          onChange={() => onToggle(id)}
          className="sr-only"
          aria-label={text}
        />
        {isCompleted && (
          <span 
            className="text-space-dark font-bold text-sm"
            style={{ animation: 'scale-bounce 0.3s ease-out' }}
          >
            ✓
          </span>
        )}
      </div>

      {/* Question Text */}
      <span 
        className={`font-mono text-base flex-1 transition-all duration-300 ${
          isCompleted ? 'line-through opacity-60' : ''
        }`}
        style={{ 
          color: isCompleted ? '#00f0ff' : '#ffffff',
        }}
      >
        {text}
      </span>
    </label>
  );
}
