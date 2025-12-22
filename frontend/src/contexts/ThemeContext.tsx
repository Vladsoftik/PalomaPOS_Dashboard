import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const getResolvedTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem('theme') as Theme | null;
    return stored || 'dark';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() =>
    getResolvedTheme(theme),
  );

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    const resolved = getResolvedTheme(newTheme);
    setResolvedTheme(resolved);
    document.documentElement.classList.toggle('dark', resolved === 'dark');
  };

  useEffect(() => {
    const resolved = getResolvedTheme(theme);
    setResolvedTheme(resolved);
    document.documentElement.classList.toggle('dark', resolved === 'dark');

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        const newResolved = getSystemTheme();
        setResolvedTheme(newResolved);
        document.documentElement.classList.toggle('dark', newResolved === 'dark');
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};




