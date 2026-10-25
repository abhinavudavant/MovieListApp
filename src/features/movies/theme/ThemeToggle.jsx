
import { useTheme } from './ThemeProvider';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={!isDark}
      className="
        inline-flex items-center gap-2 rounded-lg border
        border-slate-300 bg-white px-3 py-2 text-sm
        font-medium text-slate-700 transition-colors
        hover:bg-slate-100
        dark:border-slate-700 dark:bg-slate-800
        dark:text-slate-100 dark:hover:bg-slate-700
      "
    >
      <span aria-hidden="true">
        {isDark ? '☀️' : '🌙'}
      </span>

      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  );
}

export default ThemeToggle;
