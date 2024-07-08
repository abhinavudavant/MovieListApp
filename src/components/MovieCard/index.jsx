import React from 'react';
import './style.css'; 

const imageUrl = 'https://image.tmdb.org/t/p/w500/';
const MovieCard = ({ movie }) => {
  const { original_title, overview, poster_path, popularity, release_date } = movie;

  return (
    <div className="movie-card">
      <img className="movie-poster" src={imageUrl + poster_path} alt={original_title} />
      <div className="movie-details">
        <h2>{original_title}</h2>
        <p>Rating: {popularity}</p>
        <p>Year: {release_date}</p>
      </div>
      <div className="movie-overview">
        <h3>Overview</h3>
        <p className="movie-description">{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;


