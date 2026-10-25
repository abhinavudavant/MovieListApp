
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { tmdbClient } from '../../../lib/tmdbClient';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

function formatCurrency(amount) {
  if (!amount) return 'Not available';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

function MovieDetailsPage() {
  const { movieId } = useParams();

  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['movie-details', movieId],
    queryFn: async () => {
      const { data } = await tmdbClient.get(`/movie/${movieId}`, {
        params: { language: 'en-US' },
      });

      return data;
    },
    enabled: Boolean(movieId),
    staleTime: 1000 * 60 * 10,
  });

  const {
    data: similarData,
    isLoading: isSimilarLoading,
  } = useQuery({
    queryKey: ['similar-movies', movieId],
    queryFn: async () => {
      const { data } = await tmdbClient.get(
        `/movie/${movieId}/similar`,
        {
          params: { language: 'en-US', page: 1 },
        }
      );

      return data;
    },
    enabled: Boolean(movieId),
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return (
      <div className="px-4 py-20 text-center text-slate-600 dark:text-slate-300">
        Loading movie details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-xl font-bold">Couldn't load this movie</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {error.message}
        </p>
        <Link
          to="/"
          className="mt-5 inline-block rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Back to movies
        </Link>
      </div>
    );
  }

  if (!movie) return null;

  const releaseYear = movie.release_date?.slice(0, 4);
  const backdrop = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : null;

  return (
    <div className="pb-12 text-slate-900 dark:text-slate-50">
      {/* Movie hero */}
      <section className="relative isolate overflow-hidden bg-slate-200 dark:bg-[#0B1020]">
        {backdrop && (
          <img
            src={backdrop}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/85 to-white/50 dark:from-[#0B1020] dark:via-[#0B1020]/90 dark:to-[#0B1020]/60" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-[240px_1fr] md:py-14">
          <div className="mx-auto w-full max-w-[240px]">
            <img
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${movie.poster_path}`
                  : '/placeholder.png'
              }
              alt={`${movie.title} poster`}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>

          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/70 px-3 py-2 text-sm font-medium hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-800"
            >
              <span aria-hidden="true">←</span>
              Back to movies
            </Link>

            <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {movie.title}
              {releaseYear && (
                <span className="ml-2 font-normal text-slate-500 dark:text-slate-400">
                  ({releaseYear})
                </span>
              )}
            </h1>

            {movie.tagline && (
              <p className="mt-3 text-lg italic text-slate-600 dark:text-slate-300">
                {movie.tagline}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-violet-100 px-3 py-1 font-semibold text-violet-800 dark:bg-violet-500/20 dark:text-violet-200">
                ⭐ {movie.vote_average?.toFixed(1) ?? 'N/A'} / 10
              </span>

              {movie.release_date && (
                <span className="rounded-full bg-slate-200/80 px-3 py-1 dark:bg-slate-800">
                  {movie.release_date}
                </span>
              )}

              {movie.runtime > 0 && (
                <span className="rounded-full bg-slate-200/80 px-3 py-1 dark:bg-slate-800">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
            </div>

            {movie.genres?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-slate-300 px-3 py-1 text-sm dark:border-slate-700"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <h2 className="mt-8 text-xl font-bold">Overview</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700 dark:text-slate-300">
              {movie.overview || 'No overview is available for this movie.'}
            </p>
          </div>
        </div>
      </section>

      {/* Additional information */}
      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold">Movie information</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Status', value: movie.status || 'Not available' },
            {
              label: 'Original language',
              value: movie.original_language?.toUpperCase() || 'N/A',
            },
            {
              label: 'Budget',
              value: formatCurrency(movie.budget),
            },
            {
              label: 'Revenue',
              value: formatCurrency(movie.revenue),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#151C2E]"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
              <p className="mt-2 font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        {movie.production_companies?.length > 0 && (
          <>
            <h2 className="mt-8 text-xl font-bold">Production companies</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {movie.production_companies.map((company) => (
                <span
                  key={company.id}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-800"
                >
                  {company.name}
                </span>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Similar movies */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold">Similar movies</h2>

        {isSimilarLoading && (
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Loading similar movies...
          </p>
        )}

        {!isSimilarLoading && similarData?.results?.length === 0 && (
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            No similar movies found.
          </p>
        )}

        {similarData?.results?.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {similarData.results.slice(0, 10).map((similarMovie) => (
              <Link
                key={similarMovie.id}
                to={`/movie/${similarMovie.id}`}
                className="group min-w-0 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
              >
                <img
                  src={
                    similarMovie.poster_path
                      ? `${IMAGE_BASE_URL}${similarMovie.poster_path}`
                      : '/placeholder.png'
                  }
                  alt={`${similarMovie.title} poster`}
                  loading="lazy"
                  className="aspect-[2/3] w-full rounded-xl object-cover transition duration-200 group-hover:-translate-y-1 group-hover:shadow-lg"
                />

                <h3 className="mt-2 line-clamp-2 font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-400">
                  {similarMovie.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  ⭐ {similarMovie.vote_average?.toFixed(1) ?? 'N/A'}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MovieDetailsPage;