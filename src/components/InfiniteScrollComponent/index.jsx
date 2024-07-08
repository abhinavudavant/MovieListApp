import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieList from '../MovieList';
import GenreFilter from '../GenreFilter';

const genres = [
  { id: 16, name: 'Animation' },
  { id: 10751, name: 'Family' },
  { id: 35, name: 'Comedy' },
  { id: 12, name: 'Adventure' },
];

const InfiniteScrollComponent = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentYear, setCurrentYear] = useState(2012);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const fetchingRef = useRef(false);

  const fetchMovies = async (page, year, genres) => {
    if (fetchingRef.current) return; 
    fetchingRef.current = true;

    console.log('Fetching page:', page);

    const genreString = genres.length > 0 ? genres.join(',') : '';

    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/discover/movie`,
      params: {
        include_adult: false,
        include_video: false,
        language: 'en-US',
        page: page,
        primary_release_year: year,
        'vote_count.gte': 100,
        sort_by: 'vote_count.desc',
        with_genres: genreString, 
      },
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjVhNzA0ZmQ4MWJkMTE4ZDRhOTBjODZmZjk3NTI5YyIsIm5iZiI6MTcyMDMyMTk4MS4xMTE3MTYsInN1YiI6IjY2ODlmOWE5YzBkY2YzMzAxZmM2ZDU3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W_UpVC-intXCQxGrILCkDdQuBfDoqQ8tk4GLmCXOHGY',
},
    };

    try {
      const response = await axios.request(options);
      const newMovies = response.data.results;

      console.log('Fetched movies:', newMovies);

      if (newMovies && newMovies.length > 0) {
        setMovies((prevMovies) => page === 1 ? newMovies : [...prevMovies, ...newMovies]);
        setCurrentPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setHasMore(false);
    }

    fetchingRef.current = false;
  };

  useEffect(() => {
    fetchMovies(1, currentYear, selectedGenres);
  }, [selectedGenres]); 

  const fetchMoreMovies = () => {
    if (hasMore && !fetchingRef.current) {
      fetchMovies(currentPage, currentYear, selectedGenres);
    }
  };

  const handleFilter = (genres) => {
    setMovies([]); 
    setCurrentPage(1); 
    setHasMore(true); 
    setSelectedGenres(genres);
  };

  return (
    <div>
      <GenreFilter genres={genres} onFilter={handleFilter} />
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreMovies}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.9} 
        endMessage={<p>No more movies to load</p>}
      >
        <MovieList movies={movies} />
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollComponent;


