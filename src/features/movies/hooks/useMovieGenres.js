
import { useQuery } from '@tanstack/react-query';
import { tmdbClient } from '../../../lib/tmdbClient';

const fetchMovieGenres = async () => {
  const { data } = await tmdbClient.get('/genre/movie/list', {
    params: { language: 'en-US' },
  });

  return data.genres;
};

export function useMovieGenres() {
  return useQuery({
    queryKey: ['movie-genres'],
    queryFn: fetchMovieGenres,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
