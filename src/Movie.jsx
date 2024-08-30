import React, { useState, useEffect } from 'react';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
    setBookmarkedMovies(savedBookmarks);

    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie?limit=12`, {
          headers: {
            'X-API-KEY': 'BRQCJE9-K31MR1E-H4494N6-J8ZKJ8C',
          },
        });
        const data = await response.json();
        setMovies(data.docs);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchMovies();
  }, []);

  const toggleBookmark = (movie) => {
    let updatedBookmarks;

    if (bookmarkedMovies.some((m) => m.id === movie.id)) {
      updatedBookmarks = bookmarkedMovies.filter((m) => m.id !== movie.id);
    } else {
      updatedBookmarks = [...bookmarkedMovies, movie];
    }

    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>
      <div className="grid grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`relative bg-gray-800 text-white p-4 rounded-lg shadow-lg cursor-pointer ${
              bookmarkedMovies.some((m) => m.id === movie.id) ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => toggleBookmark(movie)}
          >
            <img
              src={movie.poster?.url}
              alt={movie.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl mt-2 font-semibold">{movie.name}</h2>
            <p className="text-sm mt-1">{movie.year}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
