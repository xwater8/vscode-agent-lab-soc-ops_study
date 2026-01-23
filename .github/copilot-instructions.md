# Copilot Instructions for Soc Ops Bingo Game

## Development Checklist

Before committing changes, ensure:
- [ ] `npm run lint` passes (ESLint with React hooks + TypeScript rules)
- [ ] `npm run build` succeeds (TypeScript + Vite production build)
- [ ] `npm test` passes (Vitest unit tests)

## Overview

React 19 + TypeScript + Vite app using Tailwind CSS v4. Social Bingo game with localStorage persistence, deploying to GitHub Pages.

## Architecture

**State**: [useBingoGame.ts](../src/hooks/useBingoGame.ts) hook manages `'start' → 'playing' → 'bingo'` lifecycle with localStorage persistence (versioned, validated)

**Logic**: [bingoLogic.ts](../src/utils/bingoLogic.ts) pure functions - `generateBoard()` (5×5 with center free space), `toggleSquare()` (immutable), `checkBingo()` (rows/cols/diagonals)

**Components**: App → StartScreen/GameScreen → BingoSquare, BingoModal

## Commands

```bash
npm run dev    # Vite dev server
npm run build  # TypeScript + Vite build  
npm run lint   # ESLint (no auto-fix)
npm test       # Vitest (non-watch)
```

## Code Patterns

**Types**: [src/types/index.ts](../src/types/index.ts) for domain models (BingoSquareData, BingoLine, GameState); export coupled types from logic files

**React**: Custom hooks for complex state; immutable updates (`.map()`, spread); `handle*` in hooks, `on*` in props

**Tailwind v4**: `@import 'tailwindcss'` in [index.css](../src/index.css); custom `@theme` variables (`--color-accent`, `--color-marked`, `--color-bingo`); see [tailwind-4.instructions.md](instructions/tailwind-4.instructions.md)

**localStorage**: Version field + type guard validation (see `validateStoredData()`); SSR guard `typeof window !== 'undefined'`

**Testing**: Vitest + @testing-library/react; test pure functions in isolation; mock `Math.random` for deterministic tests

## Design Principles

Follow [frontend-design.instructions.md](instructions/frontend-design.instructions.md): avoid generic AI aesthetics (Inter font, purple gradients); use distinctive typography/colors via CSS variables; add animations for key moments

## Design Guide: Space Galaxy Glow

Current theme implements a maximalist cosmic aesthetic with high-energy animations.

### Color Palette

**Backgrounds** (defined in `@theme`):
- `--color-space-dark: #0a0118` - Deep space black (body background)
- `--color-space-deep: #1a0b2e` - Dark purple void (containers)
- `--color-space-medium: #2d1b4e` - Medium nebula purple
- `--color-nebula-purple: #4a1a6b` - Bright nebula accents

**Neon Accents**:
- `--color-neon-cyan: #00f0ff` - Primary interactive (titles, buttons, borders)
- `--color-neon-magenta: #ff00e5` - Secondary highlights (subtitles, accents)
- `--color-neon-purple: #9d4edd` - Tertiary elements (borders, glows)
- `--color-neon-blue: #00d4ff` - Hover states
- `--color-neon-pink: #ff006e` - Special effects

**Glow Effects** (multi-layer box-shadows):
- `--glow-cyan` / `--glow-magenta` / `--glow-purple` - Full intensity (3 layers: 10px, 20px, 30px)
- `--glow-soft-cyan` / `--glow-soft-magenta` - Subtle hover states (2 layers: 5px, 10px)

### Typography

- **Display**: `Orbitron` (Google Fonts) - Titles, buttons, emphasis (weights: 400/500/700/900)
- **Body**: `Space Mono` (Google Fonts) - Instructions, square text (weights: 400/700)

Usage: `font-display` for headings/CTAs, `font-mono` for content. Always pair with `text-shadow` glows for neon effect.

### Animation Strategy

**Maximalist approach** - Every major interaction has choreographed motion:

**Keyframe Animations** (see [index.css](../src/index.css)):
- `glow-pulse` - Text/border glow intensity oscillation (3s infinite)
- `border-glow` - Cyan/blue border color cycle with shadow (dynamic)
- `float-up` - Entrance animation (opacity 0→1, translateY 30px→0)
- `ripple` - Click feedback (scale 0→4, opacity 1→0)
- `star-burst` - Victory particles (scale + rotate, 8 directions)
- `neon-flicker` - Electric flicker effect for BINGO banner
- `sweep-light` - Diagonal light sweep (translateX -100%→300%)
- `particle-float` - Modal celebration particles (custom --tx/--ty)
- `scale-bounce` - Modal entrance (scale 0→1.1→1)
- `spin-glow` - 360° rotation + hue-rotate for celebration

**Timing Patterns**:
- Staggered entrances: Use `animation-delay` increments (0.03s per item for grid, 0.1-0.6s for screen sections)
- Hover transitions: 300ms duration for scale/shadow changes
- Click feedback: 600ms ripple duration
- Infinite loops: 2-4s for glows, 3s for sweeps

### Component Patterns

**Glassmorphism**: Combine `backdrop-blur-md` + `rgba(26, 11, 46, 0.6-0.9)` backgrounds + neon borders

**Interactive States**:
- Default: Subtle glow (`--glow-soft-*`)
- Hover: Enhanced glow + `translateY(-2px)` + `scale(1.02-1.05)`
- Active: `scale(0.95-0.98)` + brighten glow
- Marked/Selected: Border to `--color-neon-cyan` + pulsing animation

**Layering**:
1. `StarField` canvas (z-index: 0, fixed, pointer-events-none)
2. Background gradients (absolute, opacity 60-70%, radial/linear combos)
3. Content (relative z-10+)
4. Modals (z-50)

### Performance Notes

- StarField optimized: Max 250 stars, `requestAnimationFrame`, responsive resize
- Use `@media (prefers-reduced-motion)` to disable animations (already configured)
- Backdrop-blur limited to key UI cards (not full-screen)

### Maintenance

When adding new components:
- Start with glassmorphic container pattern
- Add entrance animation (`float-up` with stagger)
- Apply neon accent colors for interactive elements
- Include hover glow enhancement
- Test with/without reduced motion

## Key Files

- [src/data/questions.ts](../src/data/questions.ts): 24 bingo questions + FREE_SPACE
- [vite.config.ts](../vite.config.ts): Base path auto-detects from `VITE_REPO_NAME` for GitHub Pages
- [.github/agents/](agents/): TDD Supervisor + Red/Green/Refactor agents (invoke via `@TDD Supervisor`)
