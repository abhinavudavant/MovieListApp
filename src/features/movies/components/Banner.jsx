
import ThemeToggle from '../theme/ThemeToggle'

function Banner() {
  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        border-b border-slate-200 bg-white/95
        shadow-sm backdrop-blur
        dark:border-slate-800 dark:bg-[#0B1020]/95
      "
    >
      <div className="mx-auto flex min-h-16 max-w-screen-2xl items-center justify-between gap-3 px-4 sm:px-6">
        <h1 className="text-lg font-bold tracking-wide text-slate-900 dark:text-white sm:text-xl">
          <span className="text-violet-600 dark:text-violet-400">
            CINE
          </span>
          VERSE
        </h1>

        <ThemeToggle />
      </div>
    </header>
  );
}

export default Banner;
