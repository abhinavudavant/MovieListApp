
function MovieFilters({
  search,
  onSearchChange,
  year,
  onYearChange,
  genre,
  onGenreChange,
  minRating,
  onMinRatingChange,
  sortBy,
  onSortChange,
  genres,
  onClearFilters,
}) {
  const hasFilters =
    search !== '' ||
    year !== '' ||
    genre !== '' ||
    minRating !== '' ||
    sortBy !== 'popularity.desc';

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-[#151C2E] dark:text-slate-100';

  return (
    <section
      aria-label="Search and filter movies"
      className="mx-3 mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#151C2E] sm:mx-4"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <label
            htmlFor="movie-search"
            className="mb-1.5 block text-sm font-medium"
          >
            Search movies
          </label>

          <input
            id="movie-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by movie title..."
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="movie-year"
            className="mb-1.5 block text-sm font-medium"
          >
            Release year
          </label>

          <input
            id="movie-year"
            type="number"
            min="1900"
            max={new Date().getFullYear() + 10}
            value={year}
            onChange={(event) => onYearChange(event.target.value)}
            placeholder="Any year"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="movie-genre"
            className="mb-1.5 block text-sm font-medium"
          >
            Genre
          </label>

          <select
            id="movie-genre"
            value={genre}
            onChange={(event) => onGenreChange(event.target.value)}
            className={inputClass}
          >
            <option value="">All genres</option>
            {genres.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="movie-rating"
            className="mb-1.5 block text-sm font-medium"
          >
            Minimum rating
          </label>

          <select
            id="movie-rating"
            value={minRating}
            onChange={(event) => onMinRatingChange(event.target.value)}
            className={inputClass}
          >
            <option value="">Any rating</option>
            <option value="5">5+ / 10</option>
            <option value="6">6+ / 10</option>
            <option value="7">7+ / 10</option>
            <option value="8">8+ / 10</option>
          </select>
        </div>

        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-5">
          <label
            htmlFor="movie-sort"
            className="mb-1.5 block text-sm font-medium"
          >
            Sort by
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              id="movie-sort"
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              className={inputClass}
            >
              <option value="popularity.desc">Most popular</option>
              <option value="vote_average.desc">Highest rated</option>
              <option value="primary_release_date.desc">
                Newest releases
              </option>
              <option value="revenue.desc">Highest revenue</option>
            </select>

            <button
              type="button"
              onClick={onClearFilters}
              disabled={!hasFilters}
              className="shrink-0 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieFilters;
