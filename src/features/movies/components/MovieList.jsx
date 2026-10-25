
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import { useMovieGenres } from '../hooks/useMovieGenres';
import useDebounce from '../hooks/useDebounce';
import MovieCard from './MovieCard';
import MovieFilters from './MovieFilters';

function MovieList({ year: initialYear, genreString: initialGenre }) {
  const [search, setSearch] = useState('');
  const [year, setYear] = useState(initialYear ?? '');
  const [genre, setGenre] = useState(initialGenre ?? '');
  const [minRating, setMinRating] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');

  const debouncedSearch = useDebounce(search, 400);
  const loadMoreRef = useRef(null);

  const {
    data: genres = [],
    isError: genresError,
  } = useMovieGenres();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies({
    search: debouncedSearch,
    year,
    genreString: genre,
    minRating,
    sortBy,
  });

  const movies = useMemo(() => {
    const allMovies = data?.pages.flatMap((page) => page.results) ?? [];

    // Search endpoint doesn't support all Discover filters.
    const filteredMovies = debouncedSearch.trim()
      ? allMovies.filter((movie) => {
          const matchesGenre =
            !genre || movie.genre_ids?.includes(Number(genre));

          const matchesRating =
            minRating === '' ||
            movie.vote_average >= Number(minRating);

          return matchesGenre && matchesRating;
        })
      : allMovies;

    // Sorting search results applies to the pages loaded so far.
    return [...filteredMovies].sort((a, b) => {
      switch (sortBy) {
        case 'vote_average.desc':
          return b.vote_average - a.vote_average;

        case 'primary_release_date.desc':
          return (b.release_date || '').localeCompare(a.release_date || '');

        case 'revenue.desc':
          return (b.revenue || 0) - (a.revenue || 0);

        case 'popularity.desc':
        default:
          return b.popularity - a.popularity;
      }
    });
  }, [data, debouncedSearch, genre, minRating, sortBy]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;

    if (!sentinel || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '300px 0px',
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const clearFilters = () => {
    setSearch('');
    setYear('');
    setGenre('');
    setMinRating('');
    setSortBy('popularity.desc');
  };

  return (
    <section className="pb-6">
      <MovieFilters
        search={search}
        onSearchChange={setSearch}
        year={year}
        onYearChange={setYear}
        genre={genre}
        onGenreChange={setGenre}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        sortBy={sortBy}
        onSortChange={setSortBy}
        genres={genres}
        onClearFilters={clearFilters}
      />

      {genresError && (
        <p className="px-4 pt-3 text-sm text-rose-600">
          Couldn't load genres. Please refresh and try again.
        </p>
      )}

      {isLoading && (
        <p className="py-10 text-center text-slate-600 dark:text-slate-300">
          Loading movies...
        </p>
      )}

      {isError && (
        <div className="px-4 py-10 text-center">
          <p className="text-rose-600">
            Couldn't load movies: {error.message}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && movies.length === 0 && (
        <div className="px-4 py-16 text-center">
          <p className="text-lg font-semibold">No movies found</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing your search or filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            Clear filters
          </button>
        </div>
      )}

      {!isLoading && !isError && movies.length > 0 && (
        <>
          <p className="px-4 pt-4 text-sm text-slate-500 dark:text-slate-400">
            {debouncedSearch.trim()
              ? 'Matching movies in loaded search results'
              : 'Movies matching your filters'}
          </p>

          <div className="grid grid-cols-1 gap-4 p-3 min-[521px]:grid-cols-3 min-[801px]:grid-cols-4 min-[1101px]:grid-cols-5 sm:gap-5 sm:p-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}

      <div
        ref={loadMoreRef}
        className="flex min-h-12 items-center justify-center py-4"
      >
        {isFetchingNextPage && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading more movies...
          </p>
        )}
      </div>
    </section>
  );
}

export default MovieList;
