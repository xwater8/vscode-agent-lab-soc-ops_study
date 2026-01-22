# Copilot Instructions for Soc Ops Bingo Game

## Project Overview

This is a Social Bingo game for in-person mixers. A React 19 + TypeScript + Vite app using Tailwind CSS v4 with a component-based architecture. The game uses localStorage for state persistence and deploys automatically to GitHub Pages.

## Architecture

### Component Structure
- **App** ([src/App.tsx](../src/App.tsx)): Main orchestrator, delegates state to `useBingoGame` hook
- **StartScreen**: Initial landing, triggers game initialization
- **GameScreen**: Main game board with 25 squares in 5×5 grid
- **BingoSquare**: Individual clickable square component
- **BingoModal**: Celebration modal when winning

### State Management
All game state lives in the **useBingoGame** custom hook ([src/hooks/useBingoGame.ts](../src/hooks/useBingoGame.ts)), which:
- Manages game lifecycle: `'start' → 'playing' → 'bingo'`
- Persists state to localStorage with version validation
- Provides actions: `startGame`, `handleSquareClick`, `resetGame`
- Uses pure logic functions from `bingoLogic.ts` for state transitions

### Core Logic
**bingoLogic.ts** ([src/utils/bingoLogic.ts](../src/utils/bingoLogic.ts)) contains pure, testable functions:
- `generateBoard()`: Creates 5×5 board with shuffled questions, free space at index 12
- `toggleSquare()`: Immutably toggles square marked state
- `checkBingo()`: Detects winning lines (rows, columns, diagonals)
- `getWinningSquareIds()`: Returns Set of winning square IDs for highlighting

## Development Workflows

### Running & Building
```bash
npm run dev      # Vite dev server with HMR
npm run build    # TypeScript compile + Vite build
npm run lint     # ESLint (no auto-fix by default)
npm test         # Vitest run (non-watch mode)
```

### Testing
- **Framework**: Vitest + @testing-library/react
- **Setup**: [src/test/setup.ts](../src/test/setup.ts) configures jsdom environment
- **Example**: [src/utils/bingoLogic.test.ts](../src/utils/bingoLogic.test.ts) - comprehensive pure function tests
- **Pattern**: Test logic functions in isolation; mock `Math.random` for deterministic tests

### Vite Configuration
- **Base path**: Auto-detects from `VITE_REPO_NAME` env var (set by GitHub Actions for Pages deployment)
- **Plugins**: React + Tailwind CSS v4 via `@tailwindcss/vite`
- **Test config**: Embedded in [vite.config.ts](../vite.config.ts) using `vitest/config`

## Code Conventions

### TypeScript
- **Types location**: [src/types/index.ts](../src/types/index.ts) - domain types only (BingoSquareData, BingoLine, GameState)
- **Pattern**: Export types from logic files when tightly coupled; use central types/ for shared domain models
- **No null**: Prefer `null` for "no winning line" vs undefined

### React Patterns
- **Hooks**: Extract complex state logic to custom hooks (see `useBingoGame`)
- **Immutability**: All state updates use immutable patterns (`.map()`, spread operators)
- **Props**: Destructure in function signature for clarity
- **Events**: Name handlers with `handle*` prefix in hooks, `on*` in component props

### Styling with Tailwind v4
- **Theme**: Custom CSS variables in [src/index.css](../src/index.css) `@theme` directive
- **Import**: Use `@import 'tailwindcss'` (v4 syntax, not `@tailwind` directives)
- **Colors**: Project uses custom variables: `--color-accent`, `--color-marked`, `--color-bingo`
- **Refer to**: [.github/instructions/tailwind-4.instructions.md](instructions/tailwind-4.instructions.md) for v4-specific features

### localStorage Persistence
- **Version control**: Stored data includes `version` field; validate on load to handle schema changes
- **Validation**: Use type guards (see `validateStoredData()` in useBingoGame.ts) before consuming localStorage
- **SSR guard**: Check `typeof window !== 'undefined'` before accessing localStorage

## Design & UX Principles

When working on UI components, follow the creative design philosophy in [.github/instructions/frontend-design.instructions.md](instructions/frontend-design.instructions.md):
- Avoid generic AI aesthetics (no Inter font, no purple gradients on white backgrounds)
- Use distinctive typography and color schemes with CSS variables for consistency
- Add animations for key moments (board reveals, winning celebrations)
- Match implementation complexity to aesthetic vision - simple designs need thoughtful execution

## Custom Agents

This workspace includes specialized TDD agents ([.github/agents/](agents/)):
- **TDD Supervisor**: Orchestrates full Red-Green-Refactor cycle
- **TDD Red/Green/Refactor**: Individual phase agents
- Use `@TDD Supervisor` in chat to invoke TDD workflow

## Key Files Reference

- **Configuration**: [package.json](../package.json), [vite.config.ts](../vite.config.ts), [eslint.config.js](../eslint.config.js), [tsconfig.json](../tsconfig.json)
- **Data**: [src/data/questions.ts](../src/data/questions.ts) - bingo questions array (24 items + FREE_SPACE constant)
- **Entry**: [src/main.tsx](../src/main.tsx) - React root render
- **Tests**: Pure logic in `src/utils/*.test.ts`; setup in `src/test/setup.ts`

## GitHub Deployment

- **Target**: GitHub Pages via `gh-pages` branch
- **Trigger**: Automatic on push to `main`
- **Base path**: Dynamically set via `VITE_REPO_NAME` environment variable in GitHub Actions workflow
