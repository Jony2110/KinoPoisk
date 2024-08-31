import  { useState, useEffect } from 'react';

const Bookmarks = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
    setBookmarkedMovies(savedBookmarks);
  }, []);

  const removeBookmark = (movieId) => {
    const updatedBookmarks = bookmarkedMovies.filter((movie) => movie.id !== movieId);
    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Bookmarked Movies</h1>
      {bookmarkedMovies.length === 0 ? (
        <p>No bookmarked movies</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {bookmarkedMovies.map((movie) => (
            <div key={movie.id} className="relative bg-gray-800 text-white p-4 rounded-lg shadow-lg">
              <img
                src={movie.poster?.url}
                alt={movie.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-xl mt-2 font-semibold">{movie.name}</h2>
              <p className="text-sm mt-1">{movie.year}</p>
              <button
                onClick={() => removeBookmark(movie.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
