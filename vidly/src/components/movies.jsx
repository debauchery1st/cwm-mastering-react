import React from "react";
import Like from "./common/liked";
import ListGroup from "./common/listgroup";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";

const Movies = props => {
  const {
    movieList,
    genreList,
    onDelete,
    likeMovie,
    onPageChange,
    currentPage,
    onGenreSelect,
    selectedGroup
  } = props;
  const pageSize = 4;
  const count = movieList.length;
  // const genres = new Set(movieList.map(mv => mv.genre.name));

  const filterByGenre = () =>
    !selectedGroup
      ? movieList
      : movieList.filter(m => m.genre.name === selectedGroup);

  if (count === 0) {
    return <p>There are no movies in the database.</p>;
  }
  const movies = paginate(filterByGenre(), currentPage, pageSize);
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-2">
          <ListGroup
            title="All Genres"
            group={genreList}
            onSelect={onGenreSelect}
            selectedGroup={selectedGroup}
          />
        </div>
        <div className="col">
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
            itemsCount={!selectedGroup ? count : movies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Movies;
