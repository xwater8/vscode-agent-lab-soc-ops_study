# Design Variation 1: Minimalist Zen Garden

## Overview
A calm, serene design inspired by Japanese minimalism and zen gardens. Focuses on whitespace, subtle animations, and a peaceful color palette that encourages mindful interaction.

## Core Aesthetic Principles
- **Simplicity**: Less is more - remove all unnecessary visual elements
- **Whitespace**: Generous spacing creates breathing room
- **Subtlety**: Gentle animations and micro-interactions
- **Elegance**: Refined typography and balanced composition

## Color Palette

### Primary Colors
```css
--color-sand: #f5f1e8;           /* Warm off-white background */
--color-stone: #d4cfc4;          /* Light stone gray */
--color-pebble: #9b9690;         /* Mid-tone gray */
--color-charcoal: #3d3d3d;       /* Deep charcoal text */
--color-ink: #1a1a1a;            /* Near-black for emphasis */
```

### Accent Colors
```css
--color-sage: #a8b5a0;           /* Soft sage green */
--color-clay: #c9a88e;           /* Warm terracotta */
--color-water: #b8d4d8;          /* Pale teal */
--color-bamboo: #8b9a76;         /* Muted olive green */
```

### Semantic Colors
```css
--color-surface: var(--color-sand);
--color-surface-elevated: #ffffff;
--color-border: rgba(61, 61, 61, 0.08);
--color-text-primary: var(--color-charcoal);
--color-text-secondary: var(--color-pebble);
--color-accent: var(--color-sage);
--color-marked: var(--color-clay);
--color-bingo: var(--color-bamboo);
```

## Typography

### Font Stack
```css
--font-display: 'Cormorant Garamond', serif;  /* Elegant serif for titles */
--font-body: 'Inter', sans-serif;              /* Clean sans for body */
--font-accent: 'Zen Kaku Gothic New', sans-serif; /* Japanese-inspired */
```

### Type Scale
- **Title**: 48px, font-display, 400 weight, 1.2 line-height
- **Subtitle**: 24px, font-accent, 300 weight, 1.4 line-height
- **Body**: 16px, font-body, 400 weight, 1.6 line-height
- **Caption**: 14px, font-body, 400 weight, 1.5 line-height

## Layout Principles

### Spacing System
Base unit: 8px
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

### Border Radius
- sm: 4px (subtle rounding)
- md: 8px (cards, buttons)
- lg: 16px (modals, major containers)

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.10);
```

## Animation Strategy

### Principles
- **Gentle**: All animations should be soft and calming
- **Purposeful**: Animate only to guide attention or provide feedback
- **Natural**: Use ease-out timing for organic feel

### Key Animations
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { 
    opacity: 0; 
    transform: translateY(16px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
}

@keyframes gentle-scale {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes ripple-zen {
  from { 
    transform: scale(0.8);
    opacity: 0.4;
  }
  to { 
    transform: scale(1.5);
    opacity: 0;
  }
}
```

### Timing
- Default duration: 400ms
- Stagger delay: 60ms (for sequential elements)
- Easing: cubic-bezier(0.4, 0, 0.2, 1) (gentle ease-out)

## Component Patterns

### StartScreen
- Centered vertical layout with ample whitespace
- Large, elegant title with serif typography
- Subtle subtitle fade-in
- Card with soft shadow for instructions
- Minimal border accents in sage green
- Single-color CTA button with gentle hover lift

### GameScreen
- Clean header with minimal chrome
- Generous padding around board
- Subtle background texture (paper/linen effect)
- Bingo indicator: simple banner with bamboo accent color

### BingoSquare
- White/elevated background by default
- 1px border with low opacity
- On hover: Subtle shadow increase + slight lift
- On marked: Clay color fill with check mark icon
- On bingo: Gentle bamboo border pulse
- Typography: Center-aligned, readable scale

### BingoModal
- Large border radius (16px)
- Soft shadow backdrop blur
- Elegant congratulations message
- Single focused CTA button
- Optional decorative element (zen circle or enso)

## Interactive States

### Default
- Clean, minimal appearance
- Soft borders at 8% opacity

### Hover
- Shadow increases from sm to md
- Subtle translateY(-2px) lift
- Duration: 200ms ease-out

### Active/Pressed
- Shadow decreases
- Subtle scale(0.98)
- Duration: 100ms ease-out

### Marked/Selected
- Background color changes to clay
- Border becomes visible
- Check mark or subtle indicator appears

### Focus
- 2px sage green border
- No harsh outlines

## Special Features

### Background
- Warm sand color as base
- Optional: Subtle noise texture overlay (2% opacity)
- Optional: Faint radial gradient from center (white to sand)

### Decorative Elements
- Minimalist zen stones or pebbles as subtle icons
- Simple line drawings or brush strokes
- Enso circle (zen circle) for victory moments
- Bamboo leaf or branch motifs sparingly

### Typography Treatment
- Ample letter spacing for titles (0.05em)
- Comfortable line height (1.6 for body)
- Generous paragraph spacing
- Subtle text color hierarchy

## Trade-offs

### Strengths
✓ Calming and pleasant to use for extended periods
✓ Highly accessible with good contrast
✓ Professional and polished appearance
✓ Works well in various lighting conditions
✓ Timeless design that won't feel dated

### Weaknesses
✗ May lack excitement for some users
✗ Subtle animations might feel slow to power users
✗ Lighter colors could be harder to see in bright sunlight
✗ May not convey the "game" aspect strongly enough

### Best For
- Corporate events or professional gatherings
- Users who prefer calm, distraction-free interfaces
- Environments where the app will be used for extended periods
- Audiences that appreciate refined, minimalist design

## Implementation Notes

### Critical CSS Variables
All colors, fonts, shadows, and animation timings should be defined in `@theme` in `index.css`

### Responsive Considerations
- Increase padding on larger screens
- Adjust type scale for mobile (slightly smaller titles)
- Maintain touch targets at 44px minimum

### Accessibility
- Ensure 4.5:1 contrast ratio for all text
- Provide focus indicators for keyboard navigation
- Test with screen readers
- Support prefers-reduced-motion

### Performance
- Minimal use of backdrop-blur (only for modal)
- No complex gradients or animations
- Small asset sizes for any decorative elements
