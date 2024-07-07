import React from 'react';
import MovieCard from '../MovieCard';

const MovieList = ({ movies }) => {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;

