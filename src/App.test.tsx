import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App - Scavenger Hunt Mode Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Mode Selection Flow', () => {
    it('should show StartScreen with both mode buttons initially', () => {
      render(<App />);

      expect(screen.getByRole('button', { name: /bingo/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /scavenger|hunt/i })).toBeInTheDocument();
    });

    it('should navigate to bingo game when BINGO MODE clicked', async () => {
      const user = userEvent.setup();
      render(<App />);

      const bingoButton = screen.getByRole('button', { name: /bingo mode|bingo/i });
      await user.click(bingoButton);

      // Should show bingo board (5x5 grid)
      const squares = screen.queryAllByRole('button');
      expect(squares.length).toBeGreaterThanOrEqual(25);
    });

    it('should navigate to scavenger hunt when SCAVENGER HUNT clicked', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      // Should show scavenger hunt screen
      expect(screen.getByText(/scavenger hunt/i)).toBeInTheDocument();
      
      // Should show checkboxes
      const checkboxes = screen.queryAllByRole('checkbox');
      expect(checkboxes.length).toBe(24);
    });
  });

  describe('Scavenger Hunt Screen Display', () => {
    it('should render scavenger hunt UI', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      // Should have title
      expect(screen.getByText(/scavenger hunt/i)).toBeInTheDocument();

      // Should have progress meter
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      // Should have BACK button
      expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    });

    it('should display 24 questions with checkboxes', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(24);
    });

    it('should show progress meter with 0/24 initially', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      expect(screen.getByText(/0.*24/)).toBeInTheDocument();
      expect(screen.getByText(/0%/)).toBeInTheDocument();
    });
  });

  describe('Scavenger Hunt Interactions', () => {
    it('should toggle checkbox when clicked', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      const checkboxes = screen.getAllByRole('checkbox');
      const firstCheckbox = checkboxes[0] as HTMLInputElement;
      
      expect(firstCheckbox.checked).toBe(false);

      await user.click(firstCheckbox);

      expect(firstCheckbox.checked).toBe(true);
    });

    it('should update progress when questions completed', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      const checkboxes = screen.getAllByRole('checkbox');
      
      // Complete 12 questions
      for (let i = 0; i < 12; i++) {
        await user.click(checkboxes[i]);
      }

      expect(screen.getByText(/12.*24/)).toBeInTheDocument();
      expect(screen.getByText(/50%/)).toBeInTheDocument();
    });

    it('should show completion modal when all 24 completed', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      const checkboxes = screen.getAllByRole('checkbox');
      
      // Complete all questions
      for (const checkbox of checkboxes) {
        await user.click(checkbox);
      }

      // Should show completion modal
      expect(screen.getByText(/hunt complete|mission accomplished|congratulations/i)).toBeInTheDocument();
    });
  });

  describe('Navigation Between Screens', () => {
    it('should return to StartScreen when BACK button clicked', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      expect(screen.getByText(/scavenger hunt/i)).toBeInTheDocument();

      const backButton = screen.getByRole('button', { name: /back/i });
      await user.click(backButton);

      // Should return to start screen
      expect(screen.getByRole('button', { name: /bingo mode|bingo/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /scavenger hunt|scavenger/i })).toBeInTheDocument();
    });

    it('should clear progress when returning to start', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      // Complete some questions
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);
      await user.click(checkboxes[1]);

      // Go back
      const backButton = screen.getByRole('button', { name: /back/i });
      await user.click(backButton);

      // Start scavenger hunt again
      await user.click(screen.getByRole('button', { name: /scavenger hunt|scavenger/i }));

      // Progress should be reset
      expect(screen.getByText(/0.*24/)).toBeInTheDocument();
    });

    it('should allow switching between bingo and scavenger modes', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Start bingo
      const bingoButton = screen.getByRole('button', { name: /bingo mode|bingo/i });
      await user.click(bingoButton);

      // Verify bingo screen
      const squares = screen.queryAllByRole('button');
      expect(squares.length).toBeGreaterThanOrEqual(25);

      // Go back
      const backButton1 = screen.getByRole('button', { name: /back/i });
      await user.click(backButton1);

      // Start scavenger
      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger/i });
      await user.click(scavengerButton);

      // Verify scavenger screen
      expect(screen.getByText(/scavenger hunt/i)).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox')).toHaveLength(24);
    });
  });

  describe('Scavenger Complete Modal Integration', () => {
    it('should show modal with correct content on completion', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      const checkboxes = screen.getAllByRole('checkbox');
      for (const checkbox of checkboxes) {
        await user.click(checkbox);
      }

      // Modal should appear
      const modal = screen.getByRole('dialog', { name: /hunt complete|mission|congratulations/i });
      expect(modal).toBeInTheDocument();
    });

    it('should dismiss modal when dismiss button clicked', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      const checkboxes = screen.getAllByRole('checkbox');
      for (const checkbox of checkboxes) {
        await user.click(checkbox);
      }

      const dismissButton = screen.getByRole('button', { name: /dismiss|close|ok|continue/i });
      await user.click(dismissButton);

      // Modal should disappear
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should restart hunt when play again clicked', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      const checkboxes = screen.getAllByRole('checkbox');
      for (const checkbox of checkboxes) {
        await user.click(checkbox);
      }

      const playAgainButton = screen.getByRole('button', { name: /play again|new hunt|restart/i });
      await user.click(playAgainButton);

      // Should reset to fresh hunt
      expect(screen.getByText(/0.*24/)).toBeInTheDocument();
      const newCheckboxes = screen.getAllByRole('checkbox');
      newCheckboxes.forEach((checkbox: HTMLInputElement) => {
        expect(checkbox.checked).toBe(false);
      });
    });
  });

  describe('State Persistence', () => {
    it('should save scavenger hunt state to localStorage', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);

      const stored = localStorage.getItem('bingo-game-state');
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored!);
      expect(parsed.version).toBe(2);
      expect(parsed.gameMode).toBe('scavenger');
      expect(parsed.scavengerQuestions).toHaveLength(24);
      expect(parsed.scavengerQuestions[0].isCompleted).toBe(true);
    });

    it('should restore scavenger hunt state on mount', async () => {
      const user = userEvent.setup();
      
      // First render: start and interact
      const { unmount } = render(<App />);
      
      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);
      await user.click(checkboxes[1]);

      unmount();

      // Second render: should restore state
      render(<App />);

      // Should be in scavenger hunt mode
      expect(screen.getByText(/scavenger hunt/i)).toBeInTheDocument();
      expect(screen.getByText(/2.*24/)).toBeInTheDocument();

      const restoredCheckboxes = screen.getAllByRole('checkbox');
      expect((restoredCheckboxes[0] as HTMLInputElement).checked).toBe(true);
      expect((restoredCheckboxes[1] as HTMLInputElement).checked).toBe(true);
      expect((restoredCheckboxes[2] as HTMLInputElement).checked).toBe(false);
    });
  });

  describe('Mode Isolation', () => {
    it('should not show bingo board when in scavenger mode', async () => {
      const user = userEvent.setup();
      render(<App />);

      const scavengerButton = screen.getByRole('button', { name: /scavenger hunt|scavenger|hunt/i });
      await user.click(scavengerButton);

      // Should NOT have 25 clickable squares
      const allButtons = screen.getAllByRole('button');
      const squareLikeButtons = allButtons.filter(btn => 
        !btn.textContent?.toLowerCase().includes('back')
      );
      expect(squareLikeButtons.length).not.toBe(25);

      // Should have checkboxes instead
      expect(screen.getAllByRole('checkbox')).toHaveLength(24);
    });

    it('should not show scavenger UI when in bingo mode', async () => {
      const user = userEvent.setup();
      render(<App />);

      const bingoButton = screen.getByRole('button', { name: /bingo mode|bingo/i });
      await user.click(bingoButton);

      // Should NOT have checkboxes
      expect(screen.queryAllByRole('checkbox')).toHaveLength(0);

      // Should have 25 bingo squares
      const squares = screen.getAllByRole('button').filter(btn =>
        !btn.textContent?.toLowerCase().includes('back')
      );
      expect(squares.length).toBe(25);
    });
  });
});
