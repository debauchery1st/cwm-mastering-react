import React, { useState } from "react";
import ListGroup from "./common/listgroup";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import MoviesTable from "./moviesTable";
import sortedThat from "../utils/sortedThat";
import SearchBar from "./searchBar";

const Movies = props => {
  const {
    movieList,
    genreList,
    sortColumn,
    onDelete,
    onSort,
    likeMovie,
    onPageChange,
    onNewMovie,
    currentPage,
    onGenreSelect,
    selectedGroup
  } = props;
  const [searchState, setSearchState] = useState({ search: "", filtered: [] });
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
  const renderNewMovieButton = (
    <button
      style={{ borderRadius: "5px" }}
      className="btn btn-danger"
      onClick={onNewMovie}
    >
      New Movie
    </button>
  );
  const onSearch = ({ currentTarget: input }) => {
    const clonedMovies = [...movieList];
    const clonedSearch = { ...searchState };
    clonedSearch.search = input.value;
    const filtered = clonedMovies.filter(movie =>
      movie.title.toLowerCase().includes(clonedSearch.search.toLowerCase())
    );
    clonedSearch.filtered = filtered;
    setSearchState(clonedSearch);
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-2">
          <ListGroup
            title="All Genres"
            group={[...genreList]}
            onSelect={onGenreSelect}
            selectedGroup={selectedGroup}
          />
        </div>
        <div className="col">
          {renderNewMovieButton}
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBar
            onChange={onSearch}
            value={searchState.search}
            placeholder="search"
          />
          <MoviesTable
            movies={searchState.search.length > 0 ? searchState.filtered : data}
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
