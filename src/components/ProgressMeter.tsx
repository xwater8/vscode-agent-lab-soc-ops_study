import { calculatePercentage } from '../utils/scavengerLogic';

interface ProgressMeterProps {
  completed: number;
  total: number;
}

export function ProgressMeter({ completed, total }: ProgressMeterProps) {
  const percentage = calculatePercentage(completed, total);

  return (
    <div className="w-full font-mono">
      {/* Progress Stats */}
      <div className="flex justify-between items-center mb-3">
        <span 
          className="text-lg font-bold"
          style={{ color: '#00f0ff', textShadow: 'var(--glow-soft-cyan)' }}
        >
          {completed} / {total}
        </span>
        <span 
          className="text-lg font-bold"
          style={{ color: '#ff00e5', textShadow: 'var(--glow-soft-magenta)' }}
        >
          {percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div 
        className="relative h-4 rounded-full overflow-hidden border-2"
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${completed} of ${total} questions completed`}
        style={{
          backgroundColor: 'rgba(26, 11, 46, 0.8)',
          borderColor: '#9d4edd',
          boxShadow: 'var(--glow-soft-cyan)',
        }}
      >
        <div 
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            background: percentage === 100 
              ? 'linear-gradient(90deg, #00f0ff 0%, #ff00e5 50%, #9d4edd 100%)'
              : 'linear-gradient(90deg, #00f0ff 0%, #00d4ff 100%)',
            boxShadow: percentage === 100 ? 'var(--glow-magenta)' : 'var(--glow-cyan)',
            animation: percentage === 100 ? 'glow-pulse 1s ease-in-out infinite' : 'none',
          }}
        />
      </div>
    </div>
  );
}
