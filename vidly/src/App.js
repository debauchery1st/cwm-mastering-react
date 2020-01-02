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
import Chillout from "./components/common/chillout"; // ***chillout IMPORT****
import hashCode from "./components/common/chillout/hash32";
import { b64encode } from "./components/common/chillout/madmurphy";
import "./App.css";

// try loading from a frozen state :
// const getMovies = () => [];
// const getGenres = () => [];
/* 
paste the next line into devTools and Thaw.
ewAiAHMAdABhAHQAZQAiADoAewAiAG0AbwB2AGkAZQBzACIAOgBbAHsAIgBfAGkAZAAiADoAIgA1AGIAMgAxAGMAYQAzAGUAZQBiADcAZgA2AGYAYgBjAGMAZAA0ADcAMQA4ADEAYQAiACwAIgB0AGkAdABsAGUAIgA6ACIAQQBpAHIAcABsAGEAbgBlACIALAAiAGcAZQBuAHIAZQAiADoAewAiAF8AaQBkACIAOgAiADUAYgAyADEAYwBhADMAZQBlAGIANwBmADYAZgBiAGMAYwBkADQANwAxADgAMQA0ACIALAAiAG4AYQBtAGUAIgA6ACIAQwBvAG0AZQBkAHkAIgB9ACwAIgBuAHUAbQBiAGUAcgBJAG4AUwB0AG8AYwBrACIAOgA3ACwAIgBkAGEAaQBsAHkAUgBlAG4AdABhAGwAUgBhAHQAZQAiADoAMwAuADUALAAiAGwAaQBrAGUAIgA6AHQAcgB1AGUAfQAsAHsAIgBfAGkAZAAiADoAIgA1AGIAMgAxAGMAYQAzAGUAZQBiADcAZgA2AGYAYgBjAGMAZAA0ADcAMQA4ADEANgAiACwAIgB0AGkAdABsAGUAIgA6ACIARABpAGUAIABIAGEAcgBkACIALAAiAGcAZQBuAHIAZQAiADoAewAiAF8AaQBkACIAOgAiADUAYgAyADEAYwBhADMAZQBlAGIANwBmADYAZgBiAGMAYwBkADQANwAxADgAMQA4ACIALAAiAG4AYQBtAGUAIgA6ACIAQQBjAHQAaQBvAG4AIgB9ACwAIgBuAHUAbQBiAGUAcgBJAG4AUwB0AG8AYwBrACIAOgA1ACwAIgBkAGEAaQBsAHkAUgBlAG4AdABhAGwAUgBhAHQAZQAiADoAMgAuADUALAAiAGwAaQBrAGUAIgA6AHQAcgB1AGUAfQAsAHsAIgBfAGkAZAAiADoAIgA1AGIAMgAxAGMAYQAzAGUAZQBiADcAZgA2AGYAYgBjAGMAZAA0ADcAMQA4ADEANwAiACwAIgB0AGkAdABsAGUAIgA6ACIARwBlAHQAIABPAHUAdAAiACwAIgBnAGUAbgByAGUAIgA6AHsAIgBfAGkAZAAiADoAIgA1AGIAMgAxAGMAYQAzAGUAZQBiADcAZgA2AGYAYgBjAGMAZAA0ADcAMQA4ADIAMAAiACwAIgBuAGEAbQBlACIAOgAiAFQAaAByAGkAbABsAGUAcgAiAH0ALAAiAG4AdQBtAGIAZQByAEkAbgBTAHQAbwBjAGsAIgA6ADgALAAiAGQAYQBpAGwAeQBSAGUAbgB0AGEAbABSAGEAdABlACIAOgAzAC4ANQB9ACwAewAiAF8AaQBkACIAOgAiADUAYgAyADEAYwBhADMAZQBlAGIANwBmADYAZgBiAGMAYwBkADQANwAxADgAMQBlACIALAAiAHQAaQB0AGwAZQAiADoAIgBHAG8AbgBlACAARwBpAHIAbAAiACwAIgBnAGUAbgByAGUAIgA6AHsAIgBfAGkAZAAiADoAIgA1AGIAMgAxAGMAYQAzAGUAZQBiADcAZgA2AGYAYgBjAGMAZAA0ADcAMQA4ADIAMAAiACwAIgBuAGEAbQBlACIAOgAiAFQAaAByAGkAbABsAGUAcgAiAH0ALAAiAG4AdQBtAGIAZQByAEkAbgBTAHQAbwBjAGsAIgA6ADcALAAiAGQAYQBpAGwAeQBSAGUAbgB0AGEAbABSAGEAdABlACIAOgA0AC4ANQB9ACwAewAiAF8AaQBkACIAOgAiADUAYgAyADEAYwBhADMAZQBlAGIANwBmADYAZgBiAGMAYwBkADQANwAxADgAMQA1ACIALAAiAHQAaQB0AGwAZQAiADoAIgBUAGUAcgBtAGkAbgBhAHQAbwByACIALAAiAGcAZQBuAHIAZQAiADoAewAiAF8AaQBkACIAOgAiADUAYgAyADEAYwBhADMAZQBlAGIANwBmADYAZgBiAGMAYwBkADQANwAxADgAMQA4ACIALAAiAG4AYQBtAGUAIgA6ACIAQQBjAHQAaQBvAG4AIgB9ACwAIgBuAHUAbQBiAGUAcgBJAG4AUwB0AG8AYwBrACIAOgA2ACwAIgBkAGEAaQBsAHkAUgBlAG4AdABhAGwAUgBhAHQAZQAiADoAMgAuADUALAAiAHAAdQBiAGwAaQBzAGgARABhAHQAZQAiADoAIgAyADAAMQA4AC0AMAAxAC0AMAAzAFQAMQA5ADoAMAA0ADoAMgA4AC4AOAAwADkAWgAiACwAIgBsAGkAawBlACIAOgB0AHIAdQBlAH0ALAB7ACIAXwBpAGQAIgA6ACIANQBiADIAMQBjAGEAMwBlAGUAYgA3AGYANgBmAGIAYwBjAGQANAA3ADEAOAAxADkAIgAsACIAdABpAHQAbABlACIAOgAiAFQAcgBpAHAAIAB0AG8AIABJAHQAYQBsAHkAIgAsACIAZwBlAG4AcgBlACIAOgB7ACIAXwBpAGQAIgA6ACIANQBiADIAMQBjAGEAMwBlAGUAYgA3AGYANgBmAGIAYwBjAGQANAA3ADEAOAAxADQAIgAsACIAbgBhAG0AZQAiADoAIgBDAG8AbQBlAGQAeQAiAH0ALAAiAG4AdQBtAGIAZQByAEkAbgBTAHQAbwBjAGsAIgA6ADcALAAiAGQAYQBpAGwAeQBSAGUAbgB0AGEAbABSAGEAdABlACIAOgAzAC4ANQB9ACwAewAiAF8AaQBkACIAOgAiADUAYgAyADEAYwBhADMAZQBlAGIANwBmADYAZgBiAGMAYwBkADQANwAxADgAMQBmACIALAAiAHQAaQB0AGwAZQAiADoAIgBUAGgAZQAgAFMAaQB4AHQAaAAgAFMAZQBuAHMAZQAiACwAIgBnAGUAbgByAGUAIgA6AHsAIgBfAGkAZAAiADoAIgA1AGIAMgAxAGMAYQAzAGUAZQBiADcAZgA2AGYAYgBjAGMAZAA0ADcAMQA4ADIAMAAiACwAIgBuAGEAbQBlACIAOgAiAFQAaAByAGkAbABsAGUAcgAiAH0ALAAiAG4AdQBtAGIAZQByAEkAbgBTAHQAbwBjAGsAIgA6ADQALAAiAGQAYQBpAGwAeQBSAGUAbgB0AGEAbABSAGEAdABlACIAOgAzAC4ANQAsACIAbABpAGsAZQAiADoAdAByAHUAZQB9ACwAewAiAF8AaQBkACIAOgAiADUAYgAyADEAYwBhADMAZQBlAGIANwBmADYAZgBiAGMAYwBkADQANwAxADgAMgAxACIALAAiAHQAaQB0AGwAZQAiADoAIgBUAGgAZQAgAEEAdgBlAG4AZwBlAHIAcwAiACwAIgBnAGUAbgByAGUAIgA6AHsAIgBfAGkAZAAiADoAIgA1AGIAMgAxAGMAYQAzAGUAZQBiADcAZgA2AGYAYgBjAGMAZAA0ADcAMQA4ADEAOAAiACwAIgBuAGEAbQBlACIAOgAiAEEAYwB0AGkAbwBuACIAfQAsACIAbgB1AG0AYgBlAHIASQBuAFMAdABvAGMAawAiADoANwAsACIAZABhAGkAbAB5AFIAZQBuAHQAYQBsAFIAYQB0AGUAIgA6ADMALgA1ACwAIgBsAGkAawBlACIAOgB0AHIAdQBlAH0ALAB7ACIAXwBpAGQAIgA6ACIANQBiADIAMQBjAGEAMwBlAGUAYgA3AGYANgBmAGIAYwBjAGQANAA3ADEAOAAxAGIAIgAsACIAdABpAHQAbABlACIAOgAiAFcAZQBkAGQAaQBuAGcAIABDAHIAYQBzAGgAZQByAHMAIgAsACIAZwBlAG4AcgBlACIAOgB7ACIAXwBpAGQAIgA6ACIANQBiADIAMQBjAGEAMwBlAGUAYgA3AGYANgBmAGIAYwBjAGQANAA3ADEAOAAxADQAIgAsACIAbgBhAG0AZQAiADoAIgBDAG8AbQBlAGQAeQAiAH0ALAAiAG4AdQBtAGIAZQByAEkAbgBTAHQAbwBjAGsAIgA6ADcALAAiAGQAYQBpAGwAeQBSAGUAbgB0AGEAbABSAGEAdABlACIAOgAzAC4ANQB9AF0ALAAiAGcAZQBuAHIAZQBzACIAOgBbAHsAIgBuAGEAbQBlACIAOgAiAEEAbABsACAARwBlAG4AcgBlAHMAIgAsACIAXwBpAGQAIgA6ACIAIgB9ACwAewAiAF8AaQBkACIAOgAiADUAYgAyADEAYwBhADMAZQBlAGIANwBmADYAZgBiAGMAYwBkADQANwAxADgAMQA4ACIALAAiAG4AYQBtAGUAIgA6ACIAQQBjAHQAaQBvAG4AIgB9ACwAewAiAF8AaQBkACIAOgAiADUAYgAyADEAYwBhADMAZQBlAGIANwBmADYAZgBiAGMAYwBkADQANwAxADgAMQA0ACIALAAiAG4AYQBtAGUAIgA6ACIAQwBvAG0AZQBkAHkAIgB9ACwAewAiAF8AaQBkACIAOgAiADUAYgAyADEAYwBhADMAZQBlAGIANwBmADYAZgBiAGMAYwBkADQANwAxADgAMgAwACIALAAiAG4AYQBtAGUAIgA6ACIAVABoAHIAaQBsAGwAZQByACIAfQBdACwAIgBjAHUAcgByAGUAbgB0AFAAYQBnAGUAIgA6ADEALAAiAHMAZQBsAGUAYwB0AGUAZABHAHIAbwB1AHAAIgA6ACIAVABoAHIAaQBsAGwAZQByACIALAAiAHMAbwByAHQAQwBvAGwAdQBtAG4AIgA6AHsAIgBwAGEAdABoACIAOgAiAHQAaQB0AGwAZQAiACwAIgBvAHIAZABlAHIAIgA6ACIAYQBzAGMAIgB9ACwAIgBhAGMAYwBvAHUAbgB0ACIAOgB7ACIAdQBzAGUAcgBuAGEAbQBlACIAOgAiACIALAAiAHAAYQBzAHMAdwBvAHIAZAAiADoAIgAiAH0AfQAsACIAaABpAHMAdABvAHIAeQAiADoAewAiAGwAZQBuAGcAdABoACIAOgAyADgALAAiAGEAYwB0AGkAbwBuACIAOgAiAFAAVQBTAEgAIgAsACIAbABvAGMAYQB0AGkAbwBuACIAOgB7ACIAcABhAHQAaABuAGEAbQBlACIAOgAiAC8AZABlAHYAVABvAG8AbABzACIALAAiAHMAZQBhAHIAYwBoACIAOgAiACIALAAiAGgAYQBzAGgAIgA6ACIAIgAsACIAcwB0AGEAdABlACIAOgBuAHUAbABsACwAIgBrAGUAeQAiADoAIgB1AGYAZwBiAGUAZgAiAH0AfQB9AA
*/

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
    { title: "Login", path: "/login", classes: "" },
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

  /* devTools */

  // ***chillout HANDLER****
  const handleThawState = ({ state: newState, history: newHist }) => {
    console.log(newHist);
    setAppState(newState);
  };

  // ***chillout COMPONENT****
  const freezerComponent = () => (
    <Chillout
      contents={{ state: { ...appState }, history: { ...history } }}
      onSubmit={handleThawState}
    />
  );

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
          <Route path="/devTools" exact component={freezerComponent} />
          <Redirect path="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
