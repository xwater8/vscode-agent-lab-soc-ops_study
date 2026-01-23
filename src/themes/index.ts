/** Theme system for design variations */

export type Theme = 'space-galaxy' | 'zen-garden' | 'retro-arcade' | 'brutalist-terminal';

export const themeNames: Record<Theme, string> = {
  'space-galaxy': '🌌 Space Galaxy Glow',
  'zen-garden': '🌿 Zen Garden',
  'retro-arcade': '🎮 Retro Arcade',
  'brutalist-terminal': '💻 Brutalist Terminal',
};

export const themeDescriptions: Record<Theme, string> = {
  'space-galaxy': 'Cosmic neon aesthetic with animated starfields',
  'zen-garden': 'Minimalist Japanese-inspired calm design',
  'retro-arcade': '80s/90s arcade with CRT effects and neon',
  'brutalist-terminal': 'Raw monochromatic terminal interface',
};
