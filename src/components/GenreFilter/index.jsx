import React, { useState } from 'react';

const GenreFilter = ({ genres, onFilter }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreChange = (genreId) => {
    const newSelectedGenre = selectedGenre === genreId ? null : genreId;
    setSelectedGenre(newSelectedGenre);
    onFilter(newSelectedGenre ? [newSelectedGenre] : []);
  };

  const handleAllGenres = () => {
    setSelectedGenre(null);
    onFilter([]); 
  };

  return (
    <div style={{ padding: '10px' }}>
      <button
        onClick={handleAllGenres}
        style={{ 
          margin: '5px', 
          background: selectedGenre === null ? '#121212' : '#242424', 
          color: 'white', 
          padding: '5px 10px', 
          borderRadius: '5px' 
        }}
      >
        All
      </button>
      {genres.map(genre => (
        <label key={genre.id}>
          <button
            value={genre.id}
            onClick={() => handleGenreChange(genre.id)}
            style={{ 
              margin: '5px', 
              background: selectedGenre === genre.id ? '#121212' : '#242424', 
              color: 'white', 
              padding: '5px 10px', 
              borderRadius: '5px' 
            }}
          >
            {genre.name}
          </button>
        </label>
      ))}
    </div>
  );
};

export default GenreFilter;
