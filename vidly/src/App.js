import React, { useState, useEffect } from "react";
import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";
import Movies from "./components/movies";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      console.log("App loaded.");
      setMovies(getMovies());
      console.log("getMovies()=> ok");
      setGenres(getGenres());
      console.log("getGenres()=> ok");
    }
  }, [loaded]);

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
    // console.log("set the current page to ", page);
  };

  const handleGenreSelect = genre => {
    // console.log(`selected ${genre}`);
    setSelectedGroup(genre);
    setCurrentPage(1);
  };

  return (
    <main className="container">
      <Movies
        movieList={movies}
        genreList={genres}
        onDelete={handleDelete}
        likeMovie={handleLike}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onGenreSelect={handleGenreSelect}
        selectedGroup={selectedGroup}
      />
    </main>
  );
}

export default App;
