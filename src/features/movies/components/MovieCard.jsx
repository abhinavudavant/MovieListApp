
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie }) {
  return (
    <article className="flex min-w-0 gap-3 overflow-hidden rounded-xl border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md sm:block sm:p-0">
      <img
        src={
          movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : '/placeholder.png'
        }
        alt={`${movie.title} poster`}
        loading="lazy"
        className="h-36 w-24 shrink-0 rounded-lg object-cover sm:h-auto sm:w-full sm:rounded-none sm:aspect-[2/3]"
      />

      <div className="min-w-0 flex-1 sm:p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base">
          {movie.title}
        </h3>

        <p className="mt-2 text-xs text-gray-500">
          ⭐ {movie.vote_average?.toFixed(1) ?? 'N/A'}
          {' · '}
          {movie.release_date?.slice(0, 4) || 'Year unknown'}
        </p>

        <p className="mt-2 line-clamp-4 overflow-y-auto text-sm leading-relaxed text-gray-600 scrollbar-hide">
          {movie.overview || 'No description available.'}
        </p>
      </div>
    </article>
  );
}

export default MovieCard;
