import React, { useState } from "react";
import { getMovies } from "./services/fakeMovieService";
import Movies from "./components/movies";
import "./App.css";

function App() {
  const [movies, setMovies] = useState(getMovies());
  const [currentPage, setCurrentPage] = useState(1);
  const handleDelete = movieID => {
    const cloneFilter = movies.filter(m => m._id !== movieID);
    setMovies(cloneFilter);
  };

  const handleLike = movie => {
    const cloned = [...movies];
    const idx = cloned.indexOf(movie);
    cloned[idx].like = !cloned[idx].like;
    setMovies(cloned);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    console.log("set the current page to ", page);
  };

  return (
    <main className="container">
      <Movies
        movieList={movies}
        onDelete={handleDelete}
        likeMovie={handleLike}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

export default App;
