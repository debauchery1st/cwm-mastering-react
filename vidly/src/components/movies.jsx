import React from "react";
import ListGroup from "./common/listgroup";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import MoviesTable from "./moviesTable";

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
  if (movieList.length === 0) {
    return <p>There are no movies in the database.</p>;
  }
  const pageSize = 4;
  const filterByGenre = () =>
    !selectedGroup
      ? movieList
      : movieList.filter(m => m.genre.name === selectedGroup);
  const filtered = filterByGenre();
  const movies = paginate(filtered, currentPage, pageSize);
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
          <p>Showing {filtered.length} movies in the database.</p>
          <MoviesTable
            movies={movies}
            onDelete={movieId => onDelete(movieId)}
            onLike={movie => likeMovie(movie)}
          />
          <Pagination
            itemsCount={!selectedGroup ? filtered.length : movies.length}
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
