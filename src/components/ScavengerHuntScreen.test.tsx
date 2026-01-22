import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ScavengerQuestion } from '../types';

// Mock component - will be implemented in TDD Green phase
const ScavengerHuntScreen = vi.fn(() => null);

describe('ScavengerHuntScreen', () => {
  const mockOnToggle = vi.fn();
  const mockOnBack = vi.fn();
  
  const mockQuestions: ScavengerQuestion[] = [
    { id: 0, text: 'has a pet', isCompleted: false },
    { id: 1, text: 'plays an instrument', isCompleted: true },
    { id: 2, text: 'speaks more than 2 languages', isCompleted: false },
  ];

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnBack.mockClear();
  });

  describe('Rendering', () => {
    it('should render the screen title', () => {
      render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      expect(screen.getByText(/scavenger hunt/i)).toBeInTheDocument();
    });

    it('should render all questions', () => {
      render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      expect(screen.getByText('has a pet')).toBeInTheDocument();
      expect(screen.getByText('plays an instrument')).toBeInTheDocument();
      expect(screen.getByText('speaks more than 2 languages')).toBeInTheDocument();
    });

    it('should render progress meter', () => {
      render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      // Progress meter should show 1/3 completed
      expect(screen.getByText(/1/)).toBeInTheDocument();
      expect(screen.getByText(/3/)).toBeInTheDocument();
    });

    it('should render BACK button', () => {
      render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    });

    it('should render empty state when no questions', () => {
      render(
        <ScavengerHuntScreen
          questions={[]}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      expect(screen.getByText(/0.*0/)).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onBack when BACK button clicked', async () => {
      const user = userEvent.setup();
      render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      const backButton = screen.getByRole('button', { name: /back/i });
      await user.click(backButton);

      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });

    it('should call onToggleQuestion when question item clicked', async () => {
      const user = userEvent.setup();
      render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);

      expect(mockOnToggle).toHaveBeenCalledWith(0);
    });

    it('should propagate toggle calls for all questions', async () => {
      const user = userEvent.setup();
      render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      
      await user.click(checkboxes[0]);
      expect(mockOnToggle).toHaveBeenCalledWith(0);

      await user.click(checkboxes[2]);
      expect(mockOnToggle).toHaveBeenCalledWith(2);
    });
  });

  describe('Progress Display', () => {
    it('should show correct progress for 0/24', () => {
      const allIncomplete = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `question ${i}`,
        isCompleted: false,
      }));

      render(
        <ScavengerHuntScreen
          questions={allIncomplete}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      expect(screen.getByText(/0.*24/)).toBeInTheDocument();
      expect(screen.getByText(/0%/)).toBeInTheDocument();
    });

    it('should show correct progress for 12/24', () => {
      const halfComplete = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `question ${i}`,
        isCompleted: i < 12,
      }));

      render(
        <ScavengerHuntScreen
          questions={halfComplete}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      expect(screen.getByText(/12.*24/)).toBeInTheDocument();
      expect(screen.getByText(/50%/)).toBeInTheDocument();
    });

    it('should show correct progress for 24/24', () => {
      const allComplete = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `question ${i}`,
        isCompleted: true,
      }));

      render(
        <ScavengerHuntScreen
          questions={allComplete}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      expect(screen.getByText(/24.*24/)).toBeInTheDocument();
      expect(screen.getByText(/100%/)).toBeInTheDocument();
    });
  });

  describe('Visual Design', () => {
    it('should apply Space Galaxy Glow theme', () => {
      const { container } = render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      // Check for glassmorphism and neon styling
      const hasThemeClasses = container.innerHTML.includes('backdrop-blur') ||
                             container.innerHTML.includes('neon') ||
                             container.innerHTML.includes('space');
      expect(hasThemeClasses).toBe(true);
    });

    it('should use Orbitron font for title', () => {
      const { container } = render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      const title = screen.getByText(/scavenger hunt/i);
      expect(title.className).toContain('font-display');
    });

    it('should have animated entrance effects', () => {
      const { container } = render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      // Check for animation classes
      const hasAnimations = container.innerHTML.includes('animate') ||
                           container.innerHTML.includes('float-up') ||
                           container.innerHTML.includes('transition');
      expect(hasAnimations).toBe(true);
    });
  });

  describe('Layout', () => {
    it('should render questions in a scrollable list', () => {
      const manyQuestions = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `question ${i}`,
        isCompleted: false,
      }));

      const { container } = render(
        <ScavengerHuntScreen
          questions={manyQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      // Check for overflow or scroll styling
      const hasScroll = container.innerHTML.includes('overflow') ||
                       container.innerHTML.includes('scroll') ||
                       container.innerHTML.includes('h-');
      expect(hasScroll).toBe(true);
    });

    it('should position progress meter prominently', () => {
      render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      
      // Progress should be near top, before or with title
      const container = progressBar.closest('div[class*="flex"], div[class*="grid"]');
      expect(container).toBeInTheDocument();
    });

    it('should have header with back button at top', () => {
      const { container } = render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      const backButton = screen.getByRole('button', { name: /back/i });
      const header = backButton.closest('header, div[class*="header"], div[class*="top"]');
      expect(header).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have semantic structure', () => {
      const { container } = render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      // Should use semantic HTML elements
      expect(container.querySelector('main, section, article')).toBeInTheDocument();
    });

    it('should have accessible list of questions', () => {
      render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(3);
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <ScavengerHuntScreen
          questions={mockQuestions}
          onToggleQuestion={mockOnToggle}
          onBack={mockOnBack}
        />
      );

      const backButton = screen.getByRole('button', { name: /back/i });
      backButton.focus();
      expect(backButton).toHaveFocus();

      await user.keyboard('[Tab]');
      const firstCheckbox = screen.getAllByRole('checkbox')[0];
      expect(firstCheckbox).toHaveFocus();
    });
  });
});
