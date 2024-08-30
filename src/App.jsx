
import {  Routes, Route, Link } from 'react-router-dom';
import Movies from './Movie';
import Bookmarks from './Bookmarks';

const App = () => {
  return (
    <>
      <div className="p-4">
        <nav className="mb-6">
          <Link to="/" className="mr-4 text-blue-500">Movies</Link>
          <Link to="/bookmarks" className="text-blue-500">Bookmarks</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
