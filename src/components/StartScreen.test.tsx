import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StartScreen from './StartScreen';

describe('StartScreen - Mode Selection', () => {
  const mockOnStartBingo = vi.fn();
  const mockOnStartScavenger = vi.fn();

  beforeEach(() => {
    mockOnStartBingo.mockClear();
    mockOnStartScavenger.mockClear();
  });

  describe('Rendering', () => {
    it('should render both game mode buttons', () => {
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      expect(screen.getByRole('button', { name: /bingo/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /scavenger/i })).toBeInTheDocument();
    });

    it('should render BINGO MODE button', () => {
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      const bingoButton = screen.getByRole('button', { name: /bingo mode|bingo/i });
      expect(bingoButton).toBeInTheDocument();
    });

    it('should render SCAVENGER HUNT button', () => {
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      expect(scavengerButton).toBeInTheDocument();
    });

    it('should render title', () => {
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      expect(screen.getByText(/social|bingo|ops/i)).toBeInTheDocument();
    });

    it('should render mode descriptions', () => {
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      // Should have descriptive text for each mode
      const descriptions = screen.queryAllByText(/grid|5x5|list|checkbox|questions/i);
      expect(descriptions.length).toBeGreaterThan(0);
    });
  });

  describe('Interactions', () => {
    it('should call onStartBingo when BINGO MODE clicked', async () => {
      const user = userEvent.setup();
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      const bingoButton = screen.getByRole('button', { name: /bingo mode|bingo/i });
      await user.click(bingoButton);

      expect(mockOnStartBingo).toHaveBeenCalledTimes(1);
      expect(mockOnStartScavenger).not.toHaveBeenCalled();
    });

    it('should call onStartScavenger when SCAVENGER HUNT clicked', async () => {
      const user = userEvent.setup();
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      expect(mockOnStartScavenger).toHaveBeenCalledTimes(1);
      expect(mockOnStartBingo).not.toHaveBeenCalled();
    });

    it('should handle multiple clicks correctly', async () => {
      const user = userEvent.setup();
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      const bingoButton = screen.getByRole('button', { name: /bingo mode|bingo/i });
      await user.click(bingoButton);
      await user.click(bingoButton);

      expect(mockOnStartBingo).toHaveBeenCalledTimes(2);
    });
  });

  describe('Visual Design', () => {
    it('should apply Space Galaxy Glow theme to buttons', () => {
      const { container } = render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      // Check for neon-themed classes
      const hasThemeClasses = container.innerHTML.includes('neon') ||
                             container.innerHTML.includes('glow') ||
                             container.innerHTML.includes('border');
      expect(hasThemeClasses).toBe(true);
    });

    it('should use Orbitron font for buttons', () => {
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      const bingoButton = screen.getByRole('button', { name: /bingo mode|bingo/i });
      expect(bingoButton.className).toContain('font-display');
    });

    it('should have hover effects on buttons', () => {
      const { container } = render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      const buttons = container.querySelectorAll('button');
      buttons.forEach((button) => {
        expect(
          button.className.includes('hover:') ||
          button.className.includes('transition')
        ).toBe(true);
      });
    });

    it('should have entrance animations', () => {
      const { container } = render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      // Check for float-up or staggered entrance animations
      const hasAnimations = container.innerHTML.includes('animate') ||
                           container.innerHTML.includes('float') ||
                           container.innerHTML.includes('delay');
      expect(hasAnimations).toBe(true);
    });

    it('should distinguish button styles visually', () => {
      const { container } = render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThanOrEqual(2);

      // Buttons should have distinct visual treatment
      // (could be icons, colors, borders, etc.)
      const button1Classes = buttons[0].className;
      const button2Classes = buttons[1].className;
      
      // At least one should have some unique styling
      const hasDifferentiation = button1Classes !== button2Classes ||
                                container.innerHTML.includes('🎯') ||
                                container.innerHTML.includes('📋') ||
                                container.innerHTML.includes('icon');
      expect(hasDifferentiation).toBe(true);
    });
  });

  describe('Layout', () => {
    it('should display buttons in organized layout', () => {
      const { container } = render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      // Check for flex or grid layout
      const hasLayout = container.innerHTML.includes('flex') ||
                       container.innerHTML.includes('grid') ||
                       container.innerHTML.includes('space');
      expect(hasLayout).toBe(true);
    });

    it('should have adequate spacing between buttons', () => {
      const { container } = render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      // Check for gap or margin classes
      const hasSpacing = container.innerHTML.includes('gap') ||
                        container.innerHTML.includes('space-') ||
                        container.innerHTML.includes('m-') ||
                        container.innerHTML.includes('p-');
      expect(hasSpacing).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button labels', () => {
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      const bingoButton = screen.getByRole('button', { name: /bingo/i });
      const scavengerButton = screen.getByRole('button', { name: /scavenger|hunt/i });

      expect(bingoButton).toHaveAccessibleName();
      expect(scavengerButton).toHaveAccessibleName();
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      const buttons = screen.getAllByRole('button');
      buttons[0].focus();
      expect(buttons[0]).toHaveFocus();

      await user.keyboard('[Tab]');
      expect(buttons[1]).toHaveFocus();
    });

    it('should activate on Enter key', async () => {
      const user = userEvent.setup();
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      const bingoButton = screen.getByRole('button', { name: /bingo/i });
      bingoButton.focus();
      await user.keyboard('[Enter]');

      expect(mockOnStartBingo).toHaveBeenCalled();
    });

    it('should activate on Space key', async () => {
      const user = userEvent.setup();
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      const scavengerButton = screen.getByRole('button', { name: /scavenger|hunt/i });
      scavengerButton.focus();
      await user.keyboard('[Space]');

      expect(mockOnStartScavenger).toHaveBeenCalled();
    });
  });

  describe('Mode Information', () => {
    it('should explain bingo mode', () => {
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      // Should mention grid or 5x5
      expect(screen.getByText(/grid|5x5|board/i)).toBeInTheDocument();
    });

    it('should explain scavenger hunt mode', () => {
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      // Should mention list or checkboxes
      expect(screen.getByText(/list|checkbox|check off/i)).toBeInTheDocument();
    });

    it('should indicate same questions used', () => {
      render(
        <StartScreen
          onStartBingo={mockOnStartBingo}
          onStartScavenger={mockOnStartScavenger}
        />
      );

      // Should mention that questions are the same
      const sameText = screen.queryByText(/same|both|questions/i);
      expect(sameText).toBeInTheDocument();
    });
  });
});
