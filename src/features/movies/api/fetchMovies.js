
import { tmdbClient } from '../../../lib/tmdbClient';

export const fetchMovies = async ({ pageParam = 1, queryKey, signal }) => {
  const [, filters] = queryKey;
  const {
    search = '',
    year = '',
    genreString = '',
    minRating = '',
    sortBy = 'popularity.desc',
  } = filters;

  const params = {
    include_adult: true,
    language: 'en-US',
    page: pageParam,
  };

  if (year) {
    params.primary_release_year = year;
  }

  let endpoint = '/discover/movie';

  if (search.trim()) {
    endpoint = '/search/movie';
    params.query = search.trim();
  } else {
    params.include_video = false;
    params['vote_count.gte'] = 100;
    params.sort_by = sortBy;

    if (genreString) {
      params.with_genres = genreString;
    }

    if (minRating !== '') {
      params['vote_average.gte'] = minRating;
    }
  }

  const { data } = await tmdbClient.get(endpoint, {
    params,
    signal,
  });

  return data;
};
