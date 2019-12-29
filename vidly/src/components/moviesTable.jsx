import React from "react";
import Table from "./common/table";
import Like from "./common/liked";
import { Link } from "react-router-dom";

const MoviesTable = props => {
  const { movies, onDelete, onLike, onSort, sortColumn } = props;
  const columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like isLiked={() => movie.like} onClick={() => onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          id={`${movie._id}-btn`}
          onClick={() => onDelete(movie._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      )
    }
  ];
  return (
    <Table
      columns={columns}
      data={movies}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
