import React from "react";
import Like from "./common/liked";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";

const Movies = props => {
  const { movieList, onDelete, likeMovie, onPageChange, currentPage } = props;
  const pageSize = 4;
  const count = movieList.length;
  if (count === 0) {
    return <p>There are no movies in the database.</p>;
  }
  const movies = paginate(movieList, currentPage, pageSize);

  // const handlePageChange = page => console.log("page change", page);
  return (
    <React.Fragment>
      <p>Showing {count} movies in the database.</p>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  isLiked={() => movie.like}
                  onClick={() => likeMovie(movie)}
                />
              </td>
              <td>
                <button
                  id={`${movie._id}-btn`}
                  onClick={() => onDelete(`${movie._id}`)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </React.Fragment>
  );
};

export default Movies;
