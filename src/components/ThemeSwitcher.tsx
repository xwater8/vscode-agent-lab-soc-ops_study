import { useState, useEffect } from 'react';
import type { Theme } from '../themes';
import { themeNames, themeDescriptions } from '../themes';

const STORAGE_KEY = 'bingo-theme';

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    // Load saved theme from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved in themeNames) {
        return saved as Theme;
      }
    }
    return 'space-galaxy';
  });
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, currentTheme);
    }
  }, [currentTheme]);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        {/* Current Theme Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 rounded-lg backdrop-blur-md bg-black/20 border border-white/20 text-white font-mono text-sm hover:bg-black/30 transition-all shadow-lg flex items-center gap-2"
          aria-label="Switch theme"
        >
          <span>🎨</span>
          <span className="hidden sm:inline">{themeNames[currentTheme]}</span>
          <svg 
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Theme Dropdown */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-80 rounded-lg backdrop-blur-md bg-black/40 border border-white/20 shadow-2xl overflow-hidden z-50">
              <div className="p-2 border-b border-white/10">
                <h3 className="text-white font-mono text-xs font-semibold px-2 py-1">
                  DESIGN THEMES
                </h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {(Object.keys(themeNames) as Theme[]).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => handleThemeChange(theme)}
                    className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors ${
                      currentTheme === theme ? 'bg-white/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">
                        {themeNames[theme].split(' ')[0]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-sm text-white font-semibold mb-1">
                          {themeNames[theme].split(' ').slice(1).join(' ')}
                        </div>
                        <div className="font-mono text-xs text-white/60">
                          {themeDescriptions[theme]}
                        </div>
                      </div>
                      {currentTheme === theme && (
                        <svg 
                          className="w-5 h-5 text-white flex-shrink-0" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="p-3 border-t border-white/10 bg-black/20">
                <p className="text-white/50 font-mono text-xs">
                  Theme persists across sessions
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
