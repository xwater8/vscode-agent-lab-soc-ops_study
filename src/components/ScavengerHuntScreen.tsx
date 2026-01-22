import { useMemo } from 'react';
import type { ScavengerQuestion } from '../types';
import { ProgressMeter } from './ProgressMeter';
import { ScavengerListItem } from './ScavengerListItem';

interface ScavengerHuntScreenProps {
  questions: ScavengerQuestion[];
  onToggleQuestion: (questionId: number) => void;
  onBack: () => void;
}

export function ScavengerHuntScreen({ questions, onToggleQuestion, onBack }: ScavengerHuntScreenProps) {
  const { completed, total } = useMemo(() => {
    const completed = questions.filter(q => q.isCompleted).length;
    return { completed, total: questions.length };
  }, [questions]);

  return (
    <div className="relative min-h-screen flex flex-col p-6">
      {/* Nebula Background */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(157, 78, 221, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(0, 240, 255, 0.2) 0%, transparent 50%),
            linear-gradient(180deg, #0a0118 0%, #1a0b2e 100%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Header */}
        <header 
          className="flex items-center justify-between mb-8"
          style={{ animation: 'float-up 0.6s ease-out' }}
        >
          <button
            onClick={onBack}
            className="px-6 py-2 rounded-lg border-2 font-display font-bold text-sm tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'rgba(26, 11, 46, 0.8)',
              borderColor: '#9d4edd',
              color: '#ff00e5',
              textShadow: 'var(--glow-soft-magenta)',
              boxShadow: 'var(--glow-soft-magenta)',
            }}
          >
            ← BACK
          </button>

          <h1 
            className="font-display text-3xl font-black tracking-wider"
            style={{
              color: '#00f0ff',
              textShadow: 'var(--glow-cyan)',
            }}
          >
            SCAVENGER HUNT
          </h1>
        </header>

        {/* Progress Meter */}
        <div 
          className="mb-8"
          style={{ animation: 'float-up 0.6s ease-out 0.1s backwards' }}
        >
          <ProgressMeter completed={completed} total={total} />
        </div>

        {/* Questions List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {questions.map((question) => (
            <ScavengerListItem
              key={question.id}
              id={question.id}
              text={question.text}
              isCompleted={question.isCompleted}
              onToggle={onToggleQuestion}
            />
          ))}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(26, 11, 46, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00f0ff 0%, #9d4edd 100%);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #00d4ff 0%, #ff00e5 100%);
        }
      `}</style>
    </div>
  );
}

export default ScavengerHuntScreen;
