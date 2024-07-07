// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import MovieList from '../MovieList';

// const InfiniteScrollComponent = () => {
//   const [movies, setMovies] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [currentYear, setCurrentYear] = useState(2012);
//   const fetchingRef = useRef(false);

//   const fetchMovies = async (page, year) => {
//     if (fetchingRef.current) return; // Prevent concurrent fetches
//     fetchingRef.current = true;

//     console.log('Fetching page:', page);

//     const options = {
//       method: 'GET',
//       url: `https://api.themoviedb.org/3/discover/movie`,
//       params: {
//         include_adult: false,
//         include_video: false,
//         language: 'en-US',
//         page: page,
//         primary_release_year: year,
//         'vote_count.gte': 100,
//         sort_by: 'vote_count.desc',
        
        
        
//       },
//       headers: {
//         Accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjVhNzA0ZmQ4MWJkMTE4ZDRhOTBjODZmZjk3NTI5YyIsIm5iZiI6MTcyMDMyMTk4MS4xMTE3MTYsInN1YiI6IjY2ODlmOWE5YzBkY2YzMzAxZmM2ZDU3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W_UpVC-intXCQxGrILCkDdQuBfDoqQ8tk4GLmCXOHGY',
//       },
//     };
    

//     try {
//       const response = await axios.request(options);
//       const newMovies = response.data.results;

//       console.log('Fetched movies:', newMovies);

//       if (newMovies && newMovies.length > 0) {
//         setMovies((prevMovies) => [...prevMovies, ...newMovies]);
//         setCurrentPage(page + 1);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error('Error fetching movies:', error);
//       setHasMore(false);
//     }

//     fetchingRef.current = false;
//   };

//   useEffect(() => {
//     fetchMovies(currentPage, currentYear);
//   }, []); // Empty dependency array ensures this runs once on mount

//   const fetchMoreMovies = () => {
//     if (hasMore && !fetchingRef.current) {
//       console.log('Fetching more movies...');
//       fetchMovies(currentPage, currentYear);
//     } else {
//       console.log('No more movies to fetch or fetching in progress.');
//     }
//   };

//   useEffect(() => {
//     console.log('Movies:', movies);
//     console.log('Current page:', currentPage);
//     console.log('Has more:', hasMore);
//   }, [movies, currentPage, hasMore]);

//   return (
//     <InfiniteScroll
//       dataLength={movies.length}
//       next={fetchMoreMovies}
//       hasMore={hasMore}
//       loader={<h4>Loading...</h4>}
//       scrollThreshold={0.9} // Load more movies when 90% scrolled
//       endMessage={<p>No more movies to load</p>}
//       onScroll={() => console.log('Scrolled')}
//     >
//       <MovieList movies={movies} />
//     </InfiniteScroll>
//   );
// };

// export default InfiniteScrollComponent;


// InfiniteScrollComponent.js
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
  // Add more genres as needed
];

const InfiniteScrollComponent = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentYear, setCurrentYear] = useState(2012);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const fetchingRef = useRef(false);

  const fetchMovies = async (page, year, genres) => {
    if (fetchingRef.current) return; // Prevent concurrent fetches
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
        with_genres: genreString, // Add genre filter to API request
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
  }, [selectedGenres]); // Refetch movies when selectedGenres changes

  const fetchMoreMovies = () => {
    if (hasMore && !fetchingRef.current) {
      fetchMovies(currentPage, currentYear, selectedGenres);
    }
  };

  const handleFilter = (genres) => {
    setMovies([]); // Clear current movies
    setCurrentPage(1); // Reset to first page
    setHasMore(true); // Reset hasMore flag
    setSelectedGenres(genres); // Update selected genres
  };

  return (
    <div>
      <GenreFilter genres={genres} onFilter={handleFilter} />
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreMovies}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.9} // Load more movies when 90% scrolled
        endMessage={<p>No more movies to load</p>}
      >
        <MovieList movies={movies} />
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollComponent;


