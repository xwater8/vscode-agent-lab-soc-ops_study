# Design Variation 2: Retro Arcade Neon

## Overview
An energetic, nostalgic design inspired by 1980s-90s arcade games and neon-lit entertainment venues. Features bold colors, chunky pixels, scanline effects, and authentic retro gaming UI elements.

## Core Aesthetic Principles
- **Bold**: High contrast, saturated colors
- **Nostalgic**: Authentic retro gaming references
- **Energetic**: Fast animations, dynamic effects
- **Playful**: Fun, game-focused interactions

## Color Palette

### Primary Colors (CRT Monitor Inspired)
```css
--color-screen-black: #0d0208;      /* Deep CRT black */
--color-screen-dark: #1a0f1e;       /* Dark purple monitor glow */
--color-arcade-purple: #3c096c;     /* Deep arcade cabinet purple */
--color-cabinet-blue: #10002b;      /* Navy cabinet interior */
```

### Neon Accent Colors
```css
--color-neon-pink: #ff006e;         /* Hot pink neon */
--color-neon-yellow: #ffbe0b;       /* Electric yellow */
--color-neon-cyan: #00f5ff;         /* Bright cyan */
--color-neon-green: #39ff14;        /* Acid green */
--color-neon-orange: #fb5607;       /* Neon orange */
```

### Semantic Colors
```css
--color-surface: var(--color-screen-black);
--color-surface-elevated: var(--color-arcade-purple);
--color-border: var(--color-neon-cyan);
--color-text-primary: #ffffff;
--color-text-secondary: var(--color-neon-yellow);
--color-accent: var(--color-neon-pink);
--color-marked: var(--color-neon-yellow);
--color-bingo: var(--color-neon-green);
```

## Typography

### Font Stack
```css
--font-display: 'Press Start 2P', cursive;     /* 8-bit pixel font */
--font-body: 'VT323', monospace;               /* Terminal/arcade font */
--font-score: 'Bungee', display;               /* Retro arcade display */
```

### Type Scale
- **Title**: 32px, Press Start 2P, 400 weight (pixel font is naturally bold)
- **Subtitle**: 24px, Bungee, 400 weight
- **Body**: 20px, VT323, 400 weight
- **Caption**: 18px, VT323, 400 weight

### Type Effects
- Text-shadow with neon glow (multiple layers)
- Slight chromatic aberration effect for CRT feel
- Scanline overlay on text for authenticity

## Layout Principles

### Spacing System (8px grid for pixel-perfect)
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Border Style
- **Width**: 3-4px (chunky retro borders)
- **Style**: solid, sometimes double for arcade cabinet effect
- **Corners**: Sharp 90° angles (no border-radius) OR 2px max for slight bevel

### Shadows (Box and Neon Glow)
```css
--glow-pink: 0 0 5px #ff006e, 0 0 10px #ff006e, 0 0 20px #ff006e, 0 0 40px #ff006e;
--glow-cyan: 0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ff;
--glow-yellow: 0 0 5px #ffbe0b, 0 0 10px #ffbe0b, 0 0 20px #ffbe0b;
--glow-green: 0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14;
--arcade-inset: inset 0 -4px 0 rgba(0, 0, 0, 0.5);
```

## Animation Strategy

### Principles
- **Fast**: Snappy, immediate feedback (150-300ms)
- **Arcade**: Reference coin-op game animations
- **Flashy**: Not subtle - celebrate every interaction

### Key Animations
```css
@keyframes blink-arcade {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@keyframes crt-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.95; }
}

@keyframes neon-pulse {
  0%, 100% { 
    text-shadow: var(--glow-pink);
    filter: brightness(1);
  }
  50% { 
    text-shadow: 0 0 10px #ff006e, 0 0 20px #ff006e, 0 0 40px #ff006e, 0 0 80px #ff006e;
    filter: brightness(1.5);
  }
}

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

@keyframes pixel-pop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes coin-bounce {
  0%, 100% { transform: translateY(0) rotateY(0); }
  25% { transform: translateY(-15px) rotateY(90deg); }
  50% { transform: translateY(-20px) rotateY(180deg); }
  75% { transform: translateY(-10px) rotateY(270deg); }
}

@keyframes screen-shake {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-2px, 1px); }
  20% { transform: translate(2px, -1px); }
  30% { transform: translate(-2px, -1px); }
  40% { transform: translate(2px, 1px); }
  50% { transform: translate(-1px, 2px); }
  60% { transform: translate(1px, -2px); }
  70% { transform: translate(-1px, -2px); }
  80% { transform: translate(1px, 2px); }
  90% { transform: translate(-1px, 1px); }
}
```

### Timing
- Click feedback: 150ms (instant arcade feel)
- Neon pulse: 1.5s infinite
- Blink: 800ms infinite (INSERT COIN style)
- Entrance: 300ms with bounce/pop

## Component Patterns

### StartScreen
- "INSERT COIN" style title that blinks
- Chunky border frame like an arcade cabinet
- Scanline overlay effect across entire screen
- CRT curvature effect (optional subtle barrel distortion)
- "Press START" button with pulsing neon glow
- High score / credit counter aesthetic for instructions

### GameScreen
- Pixelated border frame around entire play area
- Score display in corner with 7-segment LED style numbers
- Lives/credits indicator
- Chunky "PAUSE" or "BACK" buttons with arcade cabinet style
- Bingo banner: Full-width flashing "WINNER!" with alternating colors

### BingoSquare
- Thick 3-4px borders
- Pixel-perfect square aspect ratio
- Hover: Bright neon glow + slight scale
- Marked: Filled with neon yellow + X or check mark in pixel art style
- Bingo: Green neon glow + rapid blink animation
- Click: Quick scale down/up (arcade button press feel)

### BingoModal
- Frame as arcade game "GAME OVER" or "YOU WIN!" screen
- Flashing "WINNER!" text
- Continue/Play Again button with coin slot aesthetic
- Optional: Pixel art confetti or star burst effects
- Chunky borders with neon glow

## Interactive States

### Default
- Solid neon borders (cyan or pink)
- Subtle scanline overlay

### Hover
- Neon glow intensifies
- Border color may shift (cyan → green)
- Duration: 150ms ease-out

### Active/Pressed
- Inset shadow (arcade button depression)
- Scale down slightly (0.95)
- Border darkens momentarily
- Duration: 100ms

### Marked/Selected
- Background fills with neon yellow
- Black X or pixel check mark
- Maintains bright border

### Bingo/Winner
- Rapid color cycling
- Screen shake effect
- Multiple neon colors flashing

### Focus
- Animated dashed border (marching ants)
- Bright glow increase

## Special Features

### Background Effects
- **Scanlines**: Horizontal lines at 2-4px intervals, 10% opacity
- **CRT Curvature**: Subtle barrel distortion on outer edges
- **Vignette**: Dark corners fading to center
- **Grid**: Optional pixel grid overlay (1px lines every 8px)
- **Flicker**: Subtle 60Hz CRT flicker animation

### Decorative Elements
- Pixel art icons (stars, coins, gems)
- 8-bit style sound effect indicators (☆ DING! ☆)
- Retro game UI elements (lives hearts, coin counters)
- Arcade cabinet frame graphics
- "GAME START" and "GAME OVER" screens
- Blinking "INSERT COIN" prompts

### Sound Integration
- Visual feedback should suggest sound (BEEP! BOOP!)
- Action words in speech bubbles (POW! ZAP! BINGO!)

## Trade-offs

### Strengths
✓ Highly distinctive and memorable
✓ Strong emotional connection (nostalgia)
✓ Clear gaming context - users know it's fun
✓ High contrast = good visibility
✓ Energetic and engaging

### Weaknesses
✗ Can be overwhelming or tiring for extended use
✗ Not suitable for professional/corporate contexts
✗ Pixel fonts can be harder to read at small sizes
✗ Bright colors may cause eye strain
✗ May alienate users who don't appreciate retro aesthetics

### Best For
- Gaming conventions or esports events
- Casual social gatherings
- Younger audiences familiar with retro gaming
- Fun, informal company events
- Users who enjoy bold, playful design

## Implementation Notes

### Critical CSS Variables
Define all neon colors, glow effects, and arcade-specific variables in `@theme`

### Effects Implementation
- Scanlines: Repeating linear gradient overlay
- CRT curvature: CSS filter or SVG filter
- Neon glow: Multiple text-shadow and box-shadow layers
- Pixel borders: Ensure dimensions are multiples of 8px

### Performance Considerations
- Scanline overlay should be a single pseudo-element
- Limit number of simultaneous glow effects
- Use CSS animations over JavaScript where possible
- Test on lower-end devices (effects can be GPU-intensive)

### Font Loading
- Pixel fonts can be large - ensure proper font-display strategy
- Consider variable font alternatives for better performance
- Provide fallback to monospace fonts

### Accessibility Challenges
- Ensure animations respect prefers-reduced-motion
- Provide high contrast mode without neon effects
- Test with screen readers (decorative elements should be aria-hidden)
- Careful with blink rates (avoid seizure triggers)
- Maintain 4.5:1 contrast despite bright colors

### Responsive Behavior
- Scale pixel sizes proportionally
- Reduce glow intensity on smaller screens
- Simplify scanline density on mobile
- Ensure touch targets are large enough despite chunky borders
