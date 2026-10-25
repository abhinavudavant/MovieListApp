
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const ThemeContext = createContext(null);

function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
  } catch {
    // Storage may be unavailable in some browser contexts.
  }

  return 'dark';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // The theme still works for the current session.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'dark' ? 'light' : 'dark'
    );
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error(
      'useTheme must be used inside a ThemeProvider'
    );
  }

  return context;
}
