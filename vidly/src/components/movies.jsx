import React from "react";
import ListGroup from "./common/listgroup";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import MoviesTable from "./moviesTable";
import sortedThat from "../utils/sortedThat";

const Movies = props => {
  const {
    movieList,
    genreList,
    sortColumn,
    onDelete,
    onSort,
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
  const getPagedData = () => {
    const filterByGenre = () =>
      !selectedGroup
        ? movieList
        : movieList.filter(m => m.genre.name === selectedGroup);
    const filtered = filterByGenre();
    const sorted = sortedThat(filtered, sortColumn);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  const { totalCount, data } = getPagedData();
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
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={data}
            onDelete={movieId => onDelete(movieId)}
            onLike={movie => likeMovie(movie)}
            onSort={onSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={!selectedGroup ? totalCount : data.length}
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
