
import { Link } from 'react-router-dom';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      aria-label={`View details for ${movie.title}`}
      className="block min-w-0 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
    >
      <article
        className="
          flex h-full min-w-0 gap-3 overflow-hidden rounded-xl
          border border-slate-200 bg-white p-3
          transition duration-200 hover:-translate-y-1 hover:shadow-lg
          dark:border-slate-800 dark:bg-[#151C2E]
          sm:block sm:p-0
        "
      >
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : '/placeholder.png'
          }
          alt={`${movie.title} poster`}
          loading="lazy"
          className="
            h-36 w-24 shrink-0 rounded-lg object-cover
            sm:aspect-[2/3] sm:h-auto sm:w-full sm:rounded-none
          "
        />

        <div className="min-w-0 flex-1 sm:p-3">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-50 sm:text-base">
            {movie.title}
          </h3>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            ⭐ {movie.vote_average?.toFixed(1) ?? 'N/A'}
            {' · '}
            {movie.release_date?.slice(0, 4) || 'Year unknown'}
          </p>

          <p className="scrollbar-hide mt-2 max-h-24 overflow-y-auto text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {movie.overview || 'No description available.'}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default MovieCard;