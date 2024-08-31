import { useState, useEffect } from 'react';
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadBookmarks = () => {
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
      setBookmarkedMovies(savedBookmarks);
    };

    loadBookmarks();
  }, []);

  const fetchMovies = async (query = '', page = 1) => {
    try {
      const endpoint = query
        ? `https://api.kinopoisk.dev/v1.4/movie/search?query=${query}&limit=12&page=${page}`
        : `https://api.kinopoisk.dev/v1.4/movie?limit=12&page=${page}`;

      const response = await axios.get(endpoint, {
        headers: {
          'X-API-KEY': 'BRQCJE9-K31MR1E-H4494N6-J8ZKJ8C',
        },
      });

      setMovies(response.data.docs);
      setTotalPages(response.data.pages); 
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchMovies(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); 
    fetchMovies(searchQuery, 1);
  };

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>
      
      <form onSubmit={handleSearch} className="mb-7 ">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..."
          className="p-2 border border-gray-300 rounded-lg mr-6 w-150"
        />
       
      </form>

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

      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-2 p-2 bg-blue-500 hover:bg-blue-700 text-white  rounded-lg disabled:bg-inherit"
        >
          Previous
        </button>
        <span className="mx-4 text-lg">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-2 p-2 bg-blue-500 text-white hover:bg-blue-700 rounded-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
