import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";

import Movies from "./components/movies";
import MovieForm from "./components/movieform";
import Customers from "./components/customers";
import Rentals from "./rentals";
import NotFound from "./components/notfound";
import NavBar from "./components/common/navbar";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [appInit, setAppInit] = useState(false);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const c64 =
    '**** CONSOLE-ADORE 64 BASIC W3 ****\n\n64K RAM SYSTEM 38911 BASIC BYTES FREE\n\nREADY.\n\nLOAD "*", 8, 1\n\nLOADING...\n\nREADY.\n\nRUN';
  useEffect(() => {
    if (!appInit) {
      setAppInit(true); // shut the front door
      console.log(c64);
      setMovies(getMovies());
      console.log("GET movies => OK");
      setGenres([{ name: "All Genres", _id: "" }, ...getGenres()]);
      console.log("GET genres => OK");
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
  const brand = { title: "Vidly" };
  const navigation = [
    { title: "Movies", path: "/movies", classes: "" },
    { title: "Customers", path: "/customers", classes: "" },
    { title: "Rentals", path: "/rentals", classes: "" }
  ];
  const moviesComponent = () => (
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
  );
  return (
    <React.Fragment>
      <NavBar brand={brand} navigation={navigation} />
      <main className="container">
        <Switch>
          <Route path="/movies" exact component={moviesComponent} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/customers" component={() => <Customers />} />
          <Route path="/rentals" component={() => <Rentals />} />
          <Route path="/not-found" component={() => <NotFound />} />
          <Redirect path="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
