import React, { useState, useEffect } from "react";
import GenericForm from "./common/genericForm";
import Joi from "@hapi/joi";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

const inputfields = {
  _id: {
    rules: Joi.string()
  },
  title: {
    label: "Title",
    rules: Joi.string()
      .required()
      .label("Title")
  },
  genreID: {
    label: "Genre",
    type: "select",
    options: [],
    rules: Joi.string()
      .required()
      .label("Genre")
  },
  numberInStock: {
    label: "Number in Stock",
    type: "number",
    rules: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock")
  },
  dailyRentalRate: {
    label: "Daily Rental Rate",
    type: "number",
    rules: Joi.number()
      .required()
      .min(0)
      .max(100)
      .precision(2)
      .label("Rate")
  },
  publishDate: {
    label: "Publish Date",
    type: "string",
    rules: Joi.optional()
  }
};

const MovieForm = ({ match, onSubmit }) => {
  const [movieFormInit, setMovieFormInit] = useState(false);
  const [movieFormState, setMovieFormState] = useState({
    data: {
      _id: "",
      title: "",
      genreID: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: []
  }); // create values for controlled form
  const genres = getGenres();
  // const getGenreName = id =>
  //   genres.filter(x => x._id === id)[0].name || "not found";
  // const getGenreID = name =>
  //   genres.filter(x => x.name === name)[0].name || "not found";

  useEffect(() => {
    if (!movieFormInit) {
      setMovieFormInit(true); // shut the fron door
      // const movieId = match.params.id;
      const cloned = { ...movieFormState };
      // dynamically populate Genre <select /> with these <option />('s)
      inputfields.genreID["options"] = [
        "Genre",
        ...genres.map(({ _id, name }, idx) => name)
      ];
      // debugger;
      cloned.genres = genres;
      cloned.data._id = match.params.id;
      // try to find that movie
      const inStock = getMovies(match.params.id).filter(
        m => m && m._id === match.params.id
      )[0];
      inStock &&
        Object.keys(inStock).forEach(name => {
          name === "genre"
            ? (cloned.data.genreID = inStock[name]._id)
            : (cloned.data[name] = inStock[name]);
        });
      setMovieFormState(cloned);
    }
  }, [movieFormInit, genres, movieFormState, match.params]);

  const handleSubmit = newMovie => {
    const cloned = { ...movieFormState };
    setMovieFormState(cloned);
    console.log(`saving new movie ${cloned.title}`);
    onSubmit(cloned);
  };

  const handleChange = newState => {
    const cloned = { ...movieFormState };
    cloned.data = newState.data;
    cloned.errors = newState.errors;
    setMovieFormState(cloned);
  };

  return (
    <GenericForm
      inputfields={inputfields}
      onSubmit={handleSubmit}
      onChange={handleChange}
      formtitle="Movie Form"
      buttonlabel="Save"
      state={movieFormState}
    />
  );
};

export default MovieForm;
