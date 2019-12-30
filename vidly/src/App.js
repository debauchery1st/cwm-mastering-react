import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";

import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/common/navbar";
import LoginForm from "./components/loginForm";
import "./App.css";

function App() {
  const [appInit, setAppInit] = useState(false); // the front door
  // state
  const [appState, setAppState] = useState({
    movies: [],
    genres: [],
    currentPage: 1,
    selectedGroup: "",
    sortColumn: { path: "title", order: "asc" },
    account: { username: "", password: "" }
  });
  // init
  useEffect(() => {
    if (!appInit) {
      setAppInit(true); // shut the front door
      [
        "**** CONSOLE-ADORE 64 BASIC W3 ****\n",
        "64K RAM SYSTEM 38911 BASIC BYTES FREE\n",
        "READY.\n",
        'LOAD "*", 8, 1\n',
        "LOADING...\n",
        "READY.\n",
        "RUN"
      ].map(c64 => console.log(c64));
      const cloned = { ...appState };
      cloned.movies = getMovies();
      console.log("GET movies => OK");
      cloned.genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
      console.log("GET genres => OK");
      setAppState(cloned);
    }
  }, [appInit, appState]);

  // menu
  const brand = { title: "Vidly" };
  const navigation = [
    { title: "Movies", path: "/movies", classes: "" },
    { title: "Customers", path: "/customers", classes: "" },
    { title: "Rentals", path: "/rentals", classes: "" },
    { title: "Login", path: "/login", classes: "" }
  ];

  // event handlers
  const handleDelete = movieID => {
    const cloned = { ...appState };
    const filteredMovies = cloned.movies.filter(m => m._id !== movieID);
    cloned.movies = filteredMovies;
    setAppState(cloned);
  };

  const handleLike = movie => {
    const cloned = { ...appState };
    const idx = cloned.movies.indexOf(movie);
    cloned.movies[idx].like = !cloned.movies[idx].like;
    setAppState(cloned);
  };

  const handlePageChange = page => {
    const cloned = { ...appState };
    cloned.currentPage = page;
    setAppState(cloned);
  };

  const handleGenreSelect = genre => {
    const cloned = { ...appState };
    genre.name === "All Genres" && genre._id.length === 0
      ? (cloned.selectedGroup = "")
      : (cloned.selectedGroup = genre.name);
    cloned.currentPage = 1;
    setAppState(cloned);
  };

  const handleSort = newSortCol => {
    const cloned = { ...appState };
    const orders = ["asc", "desc"];
    const idx =
      newSortCol.path === cloned.sortColumn.path
        ? (orders.indexOf(cloned.sortColumn.order) + 1) % 2
        : orders.indexOf(cloned.sortColumn.order);
    cloned.sortColumn.path = newSortCol.path;
    cloned.sortColumn.order = orders[idx];
    setAppState(cloned);
  };

  const handleLoginFormSubmit = ({ username, password }) => {
    const cloned = { ...appState };
    cloned.account.username = username;
    cloned.account.password = password;
    setAppState(cloned);
    console.log("form submitted");
  };

  // complex components
  const moviesComponent = () => {
    return (
      <Movies
        movieList={appState.movies}
        genreList={appState.genres}
        sortColumn={appState.sortColumn}
        onDelete={handleDelete}
        onSort={handleSort}
        likeMovie={handleLike}
        currentPage={appState.currentPage}
        onPageChange={handlePageChange}
        onGenreSelect={handleGenreSelect}
        selectedGroup={appState.selectedGroup}
      />
    );
  };

  const loginComponent = () => {
    return (
      <LoginForm
        account={() => appState.account}
        onSubmit={handleLoginFormSubmit}
      />
    );
  };

  // output
  return (
    <React.Fragment>
      <NavBar brand={brand} navigation={navigation} />
      <main className="container">
        <Switch>
          <Route path="/login" exact component={loginComponent} />
          <Route path="/movies" exact component={moviesComponent} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect path="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
