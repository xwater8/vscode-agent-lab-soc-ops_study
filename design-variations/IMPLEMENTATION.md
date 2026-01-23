# Implementation Guide

This guide explains how to implement each design variation in the Soc Ops Bingo application.

## Quick Start

Each variation includes:
1. **Specification Document** (`variation-N-*.md`) - Complete design system details
2. **CSS Example** (`*.example.css`) - Working CSS implementation reference
3. **Comparison Analysis** (`COMPARISON.md`) - Decision-making guide

## Implementation Steps

### 1. Choose Your Variation

Review `COMPARISON.md` to select the best variation for your needs:
- **Zen Garden**: Versatile, professional, calm
- **Retro Arcade**: Fun, memorable, nostalgic
- **Brutalist Terminal**: Distinctive, accessible, minimal

### 2. Update Theme Variables

Replace the `@theme` block in `src/index.css` with variables from your chosen `*.example.css` file.

**Example for Zen Garden:**
```css
@theme {
  --color-sand: #f5f1e8;
  --color-sage: #a8b5a0;
  /* ... etc */
}
```

### 3. Update Typography

Add Google Fonts to `index.html`:

**Zen Garden:**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Inter:wght@400;500;600&family=Zen+Kaku+Gothic+New:wght@300;400;700&display=swap" rel="stylesheet">
```

**Retro Arcade:**
```html
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Bungee&display=swap" rel="stylesheet">
```

**Brutalist Terminal:**
```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;700&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### 4. Update Component Styles

Systematically update each component file:

#### StartScreen.tsx
- Replace background gradients/effects
- Update title styling (font, size, effects)
- Modify button appearance
- Adjust instruction card styling

#### GameScreen.tsx
- Update header styling
- Modify bingo indicator appearance
- Adjust background effects

#### BingoSquare.tsx
- Change border styles
- Update hover/marked/bingo states
- Modify typography

#### BingoModal.tsx
- Update modal styling
- Change celebration effects
- Adjust button appearance

#### StarField.tsx (Optional)
- Remove for Zen Garden and Brutalist Terminal
- Keep but adjust colors for Retro Arcade
- Or replace with theme-appropriate background

### 5. Update Keyframe Animations

Replace animation keyframes in `src/index.css` with those from your chosen `*.example.css`.

### 6. Test Thoroughly

- [ ] Test all interactive states (hover, active, marked, bingo)
- [ ] Verify animations play correctly
- [ ] Test on mobile devices
- [ ] Check accessibility (keyboard nav, screen readers)
- [ ] Validate with `prefers-reduced-motion`
- [ ] Run `npm run build` to ensure no errors

## Detailed Component Mapping

### Zen Garden

```
StartScreen:
  - Background: Sand color with subtle paper texture
  - Title: Cormorant Garamond, 3rem, charcoal
  - Button: Sage green with soft shadow, gentle hover lift
  - Card: White with subtle shadow

GameScreen:
  - Header: Minimal, clean border
  - Bingo Banner: Bamboo green with simple text
  - Board: Generous padding

BingoSquare:
  - Default: White with 1px low-opacity border
  - Hover: Shadow increases, slight lift
  - Marked: Clay fill with check mark
  - Bingo: Bamboo border pulse

BingoModal:
  - Large border-radius, soft blur
  - Elegant congratulations text
  - Optional enso circle
```

### Retro Arcade

```
StartScreen:
  - Background: CRT black with scanlines
  - Title: Press Start 2P, "INSERT COIN" blinking
  - Button: Neon gradient with thick border, glow effects
  - Frame: Arcade cabinet style

GameScreen:
  - Header: Pixelated border, status bar
  - Bingo Banner: Flashing "WINNER!" with color animation
  - Board: Pixel grid overlay

BingoSquare:
  - Default: Dark with thick cyan border
  - Hover: Neon glow + scale up
  - Marked: Yellow fill with bold X
  - Bingo: Green glow, rapid blink

BingoModal:
  - Arcade "GAME OVER" style
  - Pixel art effects
  - Screen shake animation
```

### Brutalist Terminal

```
StartScreen:
  - Background: Pure black (#000)
  - Title: Roboto Mono, "> SOC_OPS.EXE"
  - Button: "[START]" with white border
  - Layout: Terminal output style

GameScreen:
  - Header: White on black status bar
  - Bingo Banner: Terminal green background, "====== BINGO ======"
  - Board: Perfect grid alignment

BingoSquare:
  - Default: Black with 1px white border
  - Hover: Green border (instant)
  - Marked: Yellow fill, "[X]" prefix
  - Bingo: Green border flash

BingoModal:
  - Centered rectangle, 2px border
  - No backdrop blur (just black overlay)
  - "BINGO ACHIEVED" in mono
```

## Component-Specific Notes

### Removing StarField Component

For Zen Garden and Brutalist Terminal, remove StarField:

```tsx
// In App.tsx, remove:
<StarField />

// Or conditionally hide:
{theme === 'space-galaxy' && <StarField />}
```

### Background Alternatives

**Zen Garden:**
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: /* subtle paper texture */;
  opacity: 0.02;
}
```

**Retro Arcade:**
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(/* scanlines */);
  animation: crt-flicker 0.1s infinite;
}
```

**Brutalist Terminal:**
```css
/* Optional grid overlay */
.grid-overlay {
  background-size: 8px 8px;
  background-image: 
    linear-gradient(/* grid lines */);
}
```

## Common Pitfalls

### Zen Garden
- ❌ Don't make shadows too intense
- ❌ Don't speed up animations
- ✅ Keep everything gentle and calm
- ✅ Use generous whitespace

### Retro Arcade
- ❌ Don't use subtle effects (go bold!)
- ❌ Don't round corners too much
- ✅ Layer multiple glow effects
- ✅ Embrace pixel-perfect alignment

### Brutalist Terminal
- ❌ Don't add shadows or gradients
- ❌ Don't ease animations
- ✅ Keep everything instant and flat
- ✅ Align everything to 8px grid

## Performance Tips

### Zen Garden
- Limit backdrop-blur usage
- Use simple box-shadows
- Optimize font loading

### Retro Arcade
- Reduce glow layers on mobile
- Simplify scanline density
- Use CSS animations over JS
- Test on lower-end devices

### Brutalist Terminal
- Already optimal (no effects to optimize)
- Can use `will-change` for border animations
- Font smoothing disabled for crispness

## Accessibility Checklist

- [ ] All text meets 4.5:1 contrast ratio
- [ ] Focus indicators are visible
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] `prefers-reduced-motion` respected
- [ ] Touch targets ≥ 44px
- [ ] Color is not the only indicator

## Testing Matrix

| Test | Zen | Arcade | Terminal |
|------|-----|--------|----------|
| Chrome Desktop | ✓ | ✓ | ✓ |
| Firefox Desktop | ✓ | ✓ | ✓ |
| Safari Desktop | ✓ | ✓ | ✓ |
| Chrome Mobile | ✓ | ⚠️ | ✓ |
| Safari iOS | ✓ | ⚠️ | ✓ |
| Reduced Motion | ✓ | ✓ | ✓ |
| Screen Reader | ✓ | ⚠️ | ✓ |

⚠️ = May need adjustments (especially glow effects on mobile)

## Gradual Migration Strategy

Don't want to switch all at once? Implement gradually:

1. **Week 1**: Update theme variables and colors only
2. **Week 2**: Update typography system
3. **Week 3**: Update component styles one by one
4. **Week 4**: Polish animations and effects
5. **Week 5**: Full QA testing and refinement

## Rollback Plan

Keep current theme as fallback:

```tsx
// Create theme variants
const themes = {
  'space-galaxy': SpaceGalaxyTheme,
  'zen-garden': ZenGardenTheme,
  'retro-arcade': RetroArcadeTheme,
  'brutalist': BrutalistTheme,
};

// Allow theme switching
const [theme, setTheme] = useState('space-galaxy');
```

This allows A/B testing different themes with users.

## Need Help?

- Review the detailed specification documents
- Check the CSS examples for working code
- Consult COMPARISON.md for decision guidance
- Test changes incrementally
- Validate with `npm run lint` and `npm run build`

## Success Criteria

Your implementation is complete when:

✓ All components match the design specification  
✓ Animations follow the timing guidelines  
✓ Typography uses correct fonts and scales  
✓ Colors match the palette exactly  
✓ Interactive states work as specified  
✓ Accessibility requirements are met  
✓ Build passes without warnings  
✓ Visual review confirms design intent
