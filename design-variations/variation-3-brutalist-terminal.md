# Design Variation 3: Brutalist Terminal

## Overview
A raw, uncompromising design inspired by brutalist architecture and command-line interfaces. Embraces functional minimalism, harsh geometry, monochromatic palette, and the aesthetic of programmer tools.

## Core Aesthetic Principles
- **Honesty**: Expose structure, no decorative elements
- **Functionality**: Form follows function exclusively
- **Rawness**: Unpolished, industrial aesthetic
- **Precision**: Sharp edges, perfect alignment, grid-based

## Color Palette

### Monochromatic Core
```css
--color-black: #000000;             /* Pure black */
--color-void: #0a0a0a;              /* Near black */
--color-concrete: #1a1a1a;          /* Dark gray */
--color-steel: #333333;             /* Mid dark gray */
--color-iron: #666666;              /* Mid gray */
--color-aluminum: #999999;          /* Light gray */
--color-chalk: #cccccc;             /* Very light gray */
--color-white: #ffffff;             /* Pure white */
```

### Accent Colors (Minimal Use)
```css
--color-terminal-green: #00ff00;    /* Classic terminal green */
--color-error-red: #ff0000;         /* Error state */
--color-warning-yellow: #ffff00;    /* Warning/selected */
```

### Semantic Colors
```css
--color-surface: var(--color-black);
--color-surface-elevated: var(--color-concrete);
--color-border: var(--color-white);
--color-text-primary: var(--color-white);
--color-text-secondary: var(--color-aluminum);
--color-accent: var(--color-terminal-green);
--color-marked: var(--color-warning-yellow);
--color-bingo: var(--color-terminal-green);
```

## Typography

### Font Stack
```css
--font-mono: 'IBM Plex Mono', 'Courier New', monospace;    /* Primary */
--font-display: 'Roboto Mono', monospace;                   /* Headers */
--font-system: system-ui, sans-serif;                       /* Fallback */
```

### Type Scale
- **Title**: 36px, IBM Plex Mono, 700 weight, 1.1 line-height
- **Subtitle**: 20px, IBM Plex Mono, 400 weight, 1.3 line-height
- **Body**: 16px, IBM Plex Mono, 400 weight, 1.6 line-height
- **Caption**: 14px, IBM Plex Mono, 300 weight, 1.4 line-height

### Type Treatment
- ALL CAPS for titles and labels
- Monospace everywhere for brutal consistency
- No text-shadow, no glow, no effects
- Sharp, unkerned (or minimal kerning)

## Layout Principles

### Grid System
Strict 8px grid system - EVERYTHING aligns to grid

### Spacing System
Base unit: 8px (strictly enforced)
- xs: 8px
- sm: 16px
- md: 24px
- lg: 32px
- xl: 48px
- 2xl: 64px

### Border Style
- **Width**: 1px or 2px only (thin and precise)
- **Style**: solid (never dashed, dotted, or gradient)
- **Corners**: 0px (sharp right angles only) OR 1px max
- **Color**: Always white or explicit grid lines

### Shadows
NO SHADOWS. Period. Use borders and flat color only.

## Animation Strategy

### Principles
- **Minimal**: Animate only when necessary for usability
- **Instant**: No easing curves, linear timing only
- **Functional**: Animations serve purpose, not decoration

### Key Animations
```css
@keyframes blink-cursor {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@keyframes terminal-type {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes flash-border {
  0%, 100% { border-color: var(--color-white); }
  50% { border-color: var(--color-terminal-green); }
}

@keyframes grid-draw {
  from { 
    stroke-dashoffset: 1000;
  }
  to { 
    stroke-dashoffset: 0;
  }
}
```

### Timing
- Duration: 200ms maximum
- Easing: linear ONLY (no curves)
- Delays: Multiples of 50ms
- Infinite: 500ms for blink, 1000ms for pulse

## Component Patterns

### StartScreen
- Full-screen terminal interface
- `> SOC_OPS.EXE` as title
- Monospace text with cursor blink
- Instructions presented as terminal output
- `[START]` button styled as command prompt input
- Grid overlay showing structure

### GameScreen
- Header: Terminal status bar (white on black, 1px borders)
- Board area: Strict grid layout, perfect squares
- Each element: Hard borders, no spacing waste
- Bingo indicator: Full-width banner, white text on terminal green

### BingoSquare
- Perfect square with 1px white border
- Black background, white text
- No hover effects (maybe border color change only)
- Marked: Inverted colors (white bg, black text) + "[X]" prefix
- Bingo: Terminal green border, no other effects
- Typography: Monospace, left-aligned or centered

### BingoModal
- Rectangular modal, dead center, 2px border
- No backdrop blur - just overlay with 80% black
- Text: "BINGO ACHIEVED" in mono font
- `[CONTINUE]` button as command
- ASCII art decoration (optional, like `====== ★ ======`)

## Interactive States

### Default
- White 1px border
- Black background
- White text

### Hover
- Border changes to terminal green (1px)
- NO scale, shadow, or movement
- Duration: 0ms (instant)

### Active/Pressed
- Inverted colors (white bg, black text)
- Duration: 0ms (instant toggle)

### Marked/Selected
- Background: Warning yellow
- Text: Black
- Border: Black 2px

### Bingo/Winner
- Border: Terminal green 2px
- Optional: Slow blink animation (1s interval)

### Focus
- Double border (1px white + 1px green)
- OR single 2px terminal green border

## Special Features

### Background
- Pure black (#000000)
- Optional: 8px × 8px grid overlay (1px white lines at 10% opacity)
- Optional: Faint horizontal scan lines (terminal CRT effect)

### Structural Elements
- Visible grid system (show the 8px grid)
- Section dividers: Full-width 1px white lines
- ASCII art borders: `+----+` style
- Terminal prompt indicators: `>`, `$`, `#`

### Typography Treatment
- Monospace spacing rigidly enforced
- Text rendered on pixel grid (no subpixel)
- Labels prefixed with system indicators:
  - `[01]`, `[02]` for numbering
  - `>` for active/selected
  - `*` for marked
  - `!` for alerts

### UI Patterns
- Buttons as bracketed text: `[START]`, `[RESET]`, `[CONTINUE]`
- Status indicators: `STATUS: READY`, `SCORE: 0012`
- Loading states: `LOADING...` with blinking cursor
- Timestamps or system info in footer

## Special Considerations

### Terminal Aesthetic
- Mimic command-line interface behavior
- Use terminal color codes mentally (green = success, yellow = warning)
- Consider typing animations for text appearance
- Include cursor blink in appropriate places

### Brutalist Architecture References
- Exposed concrete = exposed black background
- Geometric precision = strict grid alignment
- Repetition = consistent spacing and borders
- Massive scale = large typography, generous whitespace
- Functionality = no decoration

### Grid Visualization
- Optionally show the 8px grid as visible overlay
- Use it to prove alignment (toggle on/off in dev mode)
- Components snap to grid visibly

## Trade-offs

### Strengths
✓ Extremely distinctive and bold
✓ High contrast = excellent readability
✓ Fast performance (no effects to render)
✓ Accessible (simple, clear structure)
✓ Appeals to developers and tech-savvy users
✓ Works well on any display

### Weaknesses
✗ May feel cold or unwelcoming
✗ Lacks warmth and playfulness
✗ Monochrome can be boring to some users
✗ Terminal aesthetic unfamiliar to non-technical users
✗ Can appear unfinished or "broken"
✗ Limited visual interest

### Best For
- Developer conferences or hackathons
- Tech-focused audiences
- Users who appreciate brutalist design
- Situations requiring maximum clarity
- Projects that want to stand out through minimalism
- Accessibility-focused use cases

## Implementation Notes

### Critical CSS Variables
Define monochrome palette and border widths in `@theme`

### Grid System Implementation
```css
* {
  /* Enforce 8px grid */
  box-sizing: border-box;
}

/* Grid overlay (dev mode) */
.grid-overlay {
  position: fixed;
  inset: 0;
  background-size: 8px 8px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  pointer-events: none;
}
```

### Typography Rendering
```css
body {
  -webkit-font-smoothing: none; /* Disable antialiasing for crisp mono */
  -moz-osx-font-smoothing: grayscale;
  text-rendering: geometricPrecision;
}
```

### Performance
- Zero animations by default = maximum performance
- No gradients, shadows, or blurs to render
- Simple flat colors = fast paint
- Grid can be CSS background (not canvas)

### Accessibility
- Excellent contrast ratios (white on black = 21:1)
- Clear focus indicators
- No motion by default (prefers-reduced-motion friendly)
- Screen reader friendly (semantic HTML)
- Keyboard navigation emphasized

### Responsive Behavior
- Strict grid scales proportionally
- Maintain 8px base unit at all screen sizes
- Reduce outer margins on mobile, not grid unit
- Font sizes can scale down but remain mono
- Touch targets must still meet 44px minimum

### Terminal Commands (Conceptual)
Present interactions as terminal commands:
- Start game: `> execute socops.exe`
- Mark square: `> toggle cell_05`
- Reset: `> reset --all`
- View instructions: `> help`

This creates consistency with the terminal aesthetic.
