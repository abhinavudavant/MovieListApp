import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMovies } from '../api/fetchMovies';

export const useMovies = ({ year, genreString }) => {
  return useInfiniteQuery({
    queryKey: ['movies', { year, genreString }],
    queryFn: fetchMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined,
    staleTime: 1000 * 60 * 5,
  });
};
