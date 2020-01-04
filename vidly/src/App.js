import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";

import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/common/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Chillout from "./components/common/chillout"; // ***chillout IMPORT****

import hashCode from "./components/common/chillout/hash32";
import { b64encode } from "./components/common/chillout/madmurphy";
import "./App.css";

function App() {
  const [appInit, setAppInit] = useState(false); // the front door
  const history = useHistory();
  // state
  const [appState, setAppState] = useState({
    movies: [],
    genres: [],
    currentPage: 1,
    selectedGroup: "",
    sortColumn: { path: "title", order: "asc" },
    account: { username: "", password: "" },
    signup: { email: "", password: "", name: "" }
  });

  // init
  useEffect(() => {
    if (!appInit) {
      setAppInit(true); // shut the front door
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
    { title: "Login", path: "/login", classes: "" },
    { title: "Register", path: "/register", classes: "" },
    { title: "Tools", path: "/devTools", classes: "" }
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

  const handleLoginFormSubmit = ({ data: account, errors }) => {
    const cloned = { ...appState };
    const { username, password } = account;
    cloned.account.username = username;
    cloned.account.password = hashCode(b64encode(password));
    cloned.errors = errors;
    setAppState(cloned);
    if (Object.keys(errors) > 0) {
      history.push("/login");
      return;
    }
    console.log("form submitted");
    history.push("/movies");
  };

  // complex components
  const moviesComponent = () => {
    return (
      <Movies
        movieList={[...appState.movies]}
        genreList={[...appState.genres]}
        sortColumn={{ ...appState.sortColumn }}
        onDelete={handleDelete}
        onSort={handleSort}
        likeMovie={handleLike}
        currentPage={appState.currentPage}
        onPageChange={handlePageChange}
        onGenreSelect={handleGenreSelect}
        selectedGroup={appState.selectedGroup}
        onNewMovie={() => history.push("/movies/new")}
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
  const handleRegisteNewUser = ({ data: newUser, errors }) => {
    debugger;
    const cloned = { ...appState };
    const { username, password, name } = newUser;
    cloned.signup.email = username;
    cloned.signup.password = hashCode(b64encode(password));
    cloned.signup.name = name;
    setAppState(cloned);
    if (Object.keys(errors) > 0) {
      history.push("/register");
      return;
    }
    console.log("form submitted");
    console.log("thanks for registering! please sign in to continue.");
    history.push("/login");
  };

  const registerComponent = () => {
    return <RegisterForm onSubmit={handleRegisteNewUser} />;
  };

  /* devTools */

  // ***chillout HANDLER****
  const handleThawState = ({ state: newState, history: newHist }) => {
    setAppState(newState);
  };

  // ***chillout COMPONENT****
  const freezerComponent = () => (
    <Chillout
      contents={{ state: { ...appState }, history: { ...history } }}
      onSubmit={handleThawState}
    />
  );
  // const getGenreName = id =>
  //   getGenres().filter(x => x._id === id)[0].name || "not found";
  const crudCreate = (key, data) => {
    const cloned = { ...appState };
    const neo = [...cloned[key]];
    data._id += Date.now().toString();
    neo.push(data);
    cloned[key] = neo;
    setAppState(cloned);
    history.replace(`/${key}`);
  };
  const crudUpdate = (key, data) => {
    const cloned = { ...appState };
    const morpheus = [...cloned[key]];
    const match = morpheus.filter(record => record._id === data._id)[0];
    const matchID = morpheus.indexOf(match);
    const a = morpheus.slice(0, matchID);
    const b = morpheus.slice(matchID + 1, morpheus.length);
    cloned[key] = [...a, data, ...b];
    setAppState(cloned);
    history.replace(`/${key}`);
  };

  const customFilter = (newData, genres) => {
    // debugger;
    const newRecord = {};
    const getGenreID = name => {
      const genreIsListed =
        genres.filter(genre => genre.name === name)[0] || null;
      if (!genreIsListed) return "?";
      return genreIsListed._id;
    };
    Object.keys(newData).forEach(field => (newRecord[field] = newData[field]));
    newData.genreID &&
      (newRecord.genre = {
        _id: getGenreID(newData.genreID),
        name: newData.genreID
      });
    return newRecord;
  };

  const handleCRUD = crud => {
    console.log("App.js > handleCRUD");
    const { data: crudDATA, genres, errors } = crud;
    const newRecord = customFilter(crudDATA, genres);
    const cloned = { ...appState };
    const oldRecord = cloned.movies.filter(
      movie => movie._id.trim() === newRecord._id.trim()
    )[0];
    !oldRecord
      ? crudCreate("movies", newRecord)
      : crudUpdate("movies", newRecord);
    console.log("CRUD-ed", newRecord.title);
    if (errors) console.log(errors);
  };

  const movieFormComponent = props => (
    <MovieForm onSubmit={handleCRUD} {...props} />
  );
  // output
  return (
    <React.Fragment>
      <NavBar brand={brand} navigation={navigation} />
      <main className="container">
        <Switch>
          <Route path="/login" exact component={loginComponent} />
          <Route path="/register" component={registerComponent} />
          <Route path="/movies" exact component={moviesComponent} />
          <Route path="/movies/:id" component={movieFormComponent} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/devTools" exact component={freezerComponent} />
          <Redirect path="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
