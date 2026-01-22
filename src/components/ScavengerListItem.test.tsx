import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock component - will be implemented in TDD Green phase
const ScavengerListItem = vi.fn(() => null);

describe('ScavengerListItem', () => {
  const mockOnToggle = vi.fn();
  const defaultProps = {
    id: 1,
    text: 'has a pet',
    isCompleted: false,
    onToggle: mockOnToggle,
  };

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  describe('Rendering', () => {
    it('should render the question text', () => {
      render(<ScavengerListItem {...defaultProps} />);

      expect(screen.getByText('has a pet')).toBeInTheDocument();
    });

    it('should render a checkbox', () => {
      render(<ScavengerListItem {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should render unchecked when isCompleted is false', () => {
      render(<ScavengerListItem {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('should render checked when isCompleted is true', () => {
      render(<ScavengerListItem {...defaultProps} isCompleted={true} />);

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('should apply completed styling when checked', () => {
      const { container } = render(<ScavengerListItem {...defaultProps} isCompleted={true} />);

      // Check for strikethrough or opacity change on text
      const textElement = screen.getByText('has a pet');
      const styles = window.getComputedStyle(textElement);
      
      // Could check for line-through, opacity, or specific class
      expect(
        textElement.className.includes('line-through') ||
        textElement.className.includes('opacity') ||
        styles.textDecoration.includes('line-through')
      ).toBe(true);
    });
  });

  describe('Interactions', () => {
    it('should call onToggle with correct id when clicked', () => {
      render(<ScavengerListItem {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.click();

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
      expect(mockOnToggle).toHaveBeenCalledWith(1);
    });

    it('should call onToggle when clicking the text label', () => {
      render(<ScavengerListItem {...defaultProps} />);

      const label = screen.getByText('has a pet');
      label.click();

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
      expect(mockOnToggle).toHaveBeenCalledWith(1);
    });

    it('should call onToggle when item is completed', () => {
      render(<ScavengerListItem {...defaultProps} isCompleted={true} />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.click();

      expect(mockOnToggle).toHaveBeenCalledWith(1);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA label', () => {
      render(<ScavengerListItem {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox', { name: /has a pet/i });
      expect(checkbox).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      render(<ScavengerListItem {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      
      expect(checkbox).toHaveFocus();
    });
  });

  describe('Visual Design', () => {
    it('should apply neon cyan border styling', () => {
      const { container } = render(<ScavengerListItem {...defaultProps} />);

      // Check for neon-themed classes or styles
      const element = container.firstChild as HTMLElement;
      expect(
        element.className.includes('border-neon-cyan') ||
        element.className.includes('border') ||
        element.className.includes('neon')
      ).toBe(true);
    });

    it('should have hover effects', () => {
      const { container } = render(<ScavengerListItem {...defaultProps} />);

      const element = container.firstChild as HTMLElement;
      expect(
        element.className.includes('hover:') ||
        element.className.includes('transition')
      ).toBe(true);
    });

    it('should show checkmark icon when completed', () => {
      render(<ScavengerListItem {...defaultProps} isCompleted={true} />);

      // Look for checkmark symbol or icon
      const checkmark = screen.getByText(/✓|✔|check/i);
      expect(checkmark).toBeInTheDocument();
    });
  });
});
