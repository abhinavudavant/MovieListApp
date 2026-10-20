// import { useEffect, useRef } from 'react';
// import { useMovies } from '../hooks/useMovies';
// import MovieCard from './MovieCard';

// function MovieList({ year, genreString }) {
//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useMovies({ year, genreString });

//   const loadMoreRef = useRef(null);

//   // Auto infinite scroll
//   useEffect(() => {
//     if (!hasNextPage || isFetchingNextPage) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1 }
//     );

//     if (loadMoreRef.current) {
//       observer.observe(loadMoreRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <p className="text-center">Loading movies...</p>;
//   if (isError) return <p>Error: {error.message}</p>;

//   // Flatten pages → single array
//   const movies = data.pages.flatMap(page => page.results);

//   return (
//     <>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {movies.map(movie => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </div>

//       {/* Sentinel for infinite scroll */}
//       <div ref={loadMoreRef} className="h-10 mt-6 flex justify-center">
//         {isFetchingNextPage && <p>Loading more...</p>}
//       </div>
//     </>
//   );
// }

// export default MovieList;
import { useEffect, useRef } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieCard from './MovieCard';

function MovieList({ year, genreString }) {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies({ year, genreString });

  const loadMoreRef = useRef(null);

  // Auto infinite scroll
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <p className="text-center">Loading movies...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Flatten pages → single array
  const movies = data.pages.flatMap(page => page.results);

  
return (
  <>
    <div className="grid grid-cols-1 gap-4 p-3 min-[521px]:grid-cols-3 min-[801px]:grid-cols-4 min-[1101px]:grid-cols-5 sm:gap-5 sm:p-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>

    <div
      ref={loadMoreRef}
      className="flex min-h-12 items-center justify-center py-4"
    >
      {isFetchingNextPage && (
        <p className="text-sm text-gray-500">
          Loading more movies...
        </p>
      )}
    </div>
  </>
);

}

export default MovieList;