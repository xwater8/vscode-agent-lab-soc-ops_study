import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock component - will be implemented in TDD Green phase
const ScavengerCompleteModal = vi.fn(() => null);

describe('ScavengerCompleteModal', () => {
  const mockOnDismiss = vi.fn();
  const mockOnPlayAgain = vi.fn();

  beforeEach(() => {
    mockOnDismiss.mockClear();
    mockOnPlayAgain.mockClear();
  });

  describe('Rendering', () => {
    it('should render completion message', () => {
      render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      expect(screen.getByText(/hunt complete|mission accomplished|congratulations/i)).toBeInTheDocument();
    });

    it('should render celebration text', () => {
      render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      // Should have some congratulatory message
      const messages = screen.queryAllByText(/found|completed|all|24|success/i);
      expect(messages.length).toBeGreaterThan(0);
    });

    it('should render action buttons', () => {
      render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      expect(screen.getByRole('button', { name: /dismiss|close|ok|continue/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /play again|new hunt|restart/i })).toBeInTheDocument();
    });

    it('should render as modal overlay', () => {
      const { container } = render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      // Modal should have overlay styling
      const modal = container.firstChild as HTMLElement;
      expect(
        modal.className.includes('fixed') ||
        modal.className.includes('absolute') ||
        modal.className.includes('z-')
      ).toBe(true);
    });
  });

  describe('Interactions', () => {
    it('should call onDismiss when dismiss button clicked', () => {
      render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      const dismissButton = screen.getByRole('button', { name: /dismiss|close|ok|continue/i });
      dismissButton.click();

      expect(mockOnDismiss).toHaveBeenCalledTimes(1);
    });

    it('should call onPlayAgain when play again button clicked', () => {
      render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      const playAgainButton = screen.getByRole('button', { name: /play again|new hunt|restart/i });
      playAgainButton.click();

      expect(mockOnPlayAgain).toHaveBeenCalledTimes(1);
    });

    it('should call onDismiss when clicking backdrop', () => {
      const { container } = render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      // Click outside modal content (on backdrop)
      const backdrop = container.firstChild as HTMLElement;
      backdrop.click();

      expect(mockOnDismiss).toHaveBeenCalled();
    });

    it('should not dismiss when clicking modal content', () => {
      render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      const title = screen.getByText(/hunt complete|mission accomplished|congratulations/i);
      title.click();

      expect(mockOnDismiss).not.toHaveBeenCalled();
    });
  });

  describe('Visual Design', () => {
    it('should apply Space Galaxy Glow theme', () => {
      const { container } = render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      // Check for glassmorphism and neon styling
      const hasThemeClasses = container.innerHTML.includes('backdrop-blur') ||
                             container.innerHTML.includes('neon') ||
                             container.innerHTML.includes('glow');
      expect(hasThemeClasses).toBe(true);
    });

    it('should use Orbitron font for title', () => {
      render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      const title = screen.getByText(/hunt complete|mission accomplished|congratulations/i);
      expect(title.className).toContain('font-display');
    });

    it('should have celebration animations', () => {
      const { container } = render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      // Check for celebration-specific animations
      const hasAnimations = container.innerHTML.includes('animate') ||
                           container.innerHTML.includes('scale') ||
                           container.innerHTML.includes('particle') ||
                           container.innerHTML.includes('float');
      expect(hasAnimations).toBe(true);
    });

    it('should have distinct styling from BingoModal', () => {
      const { container } = render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      // Should NOT say "BINGO" anywhere
      expect(screen.queryByText(/bingo/i)).not.toBeInTheDocument();
      
      // Should have hunt/scavenger specific messaging
      const huntText = screen.queryByText(/hunt|scavenger|found|collected/i);
      expect(huntText).toBeInTheDocument();
    });

    it('should show particle effects on mount', () => {
      const { container } = render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      // Look for particle elements or animation triggers
      const hasParticles = container.innerHTML.includes('particle') ||
                          container.querySelector('[class*="particle"]') !== null;
      expect(hasParticles).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have dialog role', () => {
      const { container } = render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      const dialog = container.querySelector('[role="dialog"], [role="alertdialog"]');
      expect(dialog).toBeInTheDocument();
    });

    it('should have aria-modal attribute', () => {
      const { container } = render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      const modal = container.querySelector('[aria-modal="true"]');
      expect(modal).toBeInTheDocument();
    });

    it('should have aria-labelledby for title', () => {
      const { container } = render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      const dialog = container.querySelector('[role="dialog"], [role="alertdialog"]');
      expect(dialog?.hasAttribute('aria-labelledby')).toBe(true);
    });

    it('should support keyboard navigation between buttons', () => {
      render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      const buttons = screen.getAllByRole('button');
      buttons[0].focus();
      expect(buttons[0]).toHaveFocus();
    });
  });

  describe('Statistics Display', () => {
    it('should show completion count', () => {
      render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      // Should mention 24 items completed
      expect(screen.getByText(/24/)).toBeInTheDocument();
    });

    it('should display encouraging message', () => {
      render(
        <ScavengerCompleteModal
          onDismiss={mockOnDismiss}
          onPlayAgain={mockOnPlayAgain}
        />
      );

      // Should have positive messaging
      const messages = screen.queryAllByText(/great|awesome|excellent|well done|amazing/i);
      expect(messages.length).toBeGreaterThan(0);
    });
  });
});
