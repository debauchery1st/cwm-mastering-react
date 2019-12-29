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
  const [appInit, setAppInit] = useState(false);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    if (!appInit) {
      setAppInit(true); // shut the front door
      console.log("App loaded.");
      setMovies(getMovies());
      console.log("getMovies()=> ok");
      setGenres([{ name: "All Genres", _id: "" }, ...getGenres()]);
      console.log("getGenres()=> ok");
    }
  }, [appInit]);

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
  };

  const handleGenreSelect = genre => {
    genre.name === "All Genres" && genre._id.length === 0
      ? setSelectedGroup("")
      : setSelectedGroup(genre.name);
    setCurrentPage(1);
  };

  const handleSort = newSortCol => {
    const cloned = { ...sortColumn };
    const orders = ["asc", "desc"];
    const idx =
      newSortCol.path === cloned.path
        ? (orders.indexOf(cloned.order) + 1) % 2
        : orders.indexOf(cloned.order);
    cloned.path = newSortCol.path;
    cloned.order = orders[idx];
    setSortColumn(cloned);
  };

  return (
    <main className="container">
      <Movies
        movieList={movies}
        genreList={genres}
        sortColumn={sortColumn}
        onDelete={handleDelete}
        onSort={handleSort}
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
