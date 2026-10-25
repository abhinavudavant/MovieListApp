
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMovies } from '../api/fetchMovies';

export const useMovies = ({
  search = '',
  year = '',
  genreString = '',
  minRating = '',
  sortBy = 'popularity.desc',
}) => {
  return useInfiniteQuery({
    queryKey: [
      'movies',
      {
        search,
        year,
        genreString,
        minRating,
        sortBy,
      },
    ],
    queryFn: fetchMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined,
    staleTime: 1000 * 60 * 5,
  });
};
