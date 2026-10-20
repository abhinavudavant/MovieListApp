import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { tmdbClient } from '../../lib/tmdbClient'; // Double check this path!

// 1. The fetch function (Named Export)
export const fetchMovies = async ({ pageParam = 1, queryKey }) => {
  const [_key, { year, genreString }] = queryKey;
  const response = await tmdbClient.get('/discover/movie', {
    params: {
      include_adult: false,
      include_video: false,
      language: 'en-US',
      page: pageParam,
      primary_release_year: year,
      'vote_count.gte': 100,
      sort_by: 'vote_count.desc',
      with_genres: genreString,
    },
  });
  return response.data;
};

// 2. The Component (Default Export)
// const MovieData = () => {
//   const { data, isLoading, error } = useInfiniteQuery({
//     queryKey: ['movies', { year: 2025, genreString: '' }],
//     queryFn: fetchMovies,
//     initialPageParam: 1,
//     getNextPageParam: (lastPage) => lastPage.page + 1,
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       {data?.pages.map((page, i) => (
//         <React.Fragment key={i}>
//           {page.results.map((movie) => (
//             <p key={movie.id}>{movie.title}</p>
//           ))}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

// export default MovieData;