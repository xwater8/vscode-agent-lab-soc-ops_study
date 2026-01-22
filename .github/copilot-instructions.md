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

## Key Files

- [src/data/questions.ts](../src/data/questions.ts): 24 bingo questions + FREE_SPACE
- [vite.config.ts](../vite.config.ts): Base path auto-detects from `VITE_REPO_NAME` for GitHub Pages
- [.github/agents/](agents/): TDD Supervisor + Red/Green/Refactor agents (invoke via `@TDD Supervisor`)
