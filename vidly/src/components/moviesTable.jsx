import React from "react";
import Like from "./common/liked";
import TableHeader from "./common/tableHeader";

const MoviesTable = props => {
  const { movies, onDelete, onLike, onSort } = props;
  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" }
  ];
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortColumn={props.sortColumn}
        onSort={onSort}
      />
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like isLiked={() => movie.like} onClick={() => onLike(movie)} />
            </td>
            <td>
              <button
                id={`${movie._id}-btn`}
                onClick={() => onDelete(movie._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
