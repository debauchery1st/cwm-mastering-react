import React, { useState } from "react";
import { getMovies } from "./services/fakeMovieService";
import Movies from "./components/movies";
import "./App.css";

function App() {
  const [movies, setMovies] = useState(getMovies());

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

  return (
    <main className="container">
      <Movies
        movieList={movies}
        onDelete={handleDelete}
        likeMovie={handleLike}
      />
    </main>
  );
}

export default App;
