import {tmdbClient} from '../../../lib/tmdbClient';

export const fetchMovies = async ({ pageParam = 1, queryKey }) => {
  const [, { year }] = queryKey;
  const response = await tmdbClient.get('/discover/movie', {
    params: {
      include_adult: true,
      include_video: false,
      language: 'en-US',
      page: pageParam,
      primary_release_year: year,
      'vote_count.gte': 100,
      // sort_by: 'vote_count.desc',
      // with_genres: genreString,
    },
  });
  console.log("response.data",response.data)
  return response.data;
};

