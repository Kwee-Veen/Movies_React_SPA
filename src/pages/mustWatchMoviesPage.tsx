import React, { useContext } from "react"
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import RemoveFromMustWatchMovies from "../components/cardIcons/removeFromMustWatchMovies";
import WriteReview from "../components/cardIcons/writeReview";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const MustWatchMoviesPage: React.FC = () => {
  const { mustWatchList: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  document.title = `Must Watch Movies - TMDB Client`

  // Create an array of queries and run them in parallel.
  const mustWatchMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = mustWatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allMustWatchMovies = mustWatchMovieQueries.map((q) => q.data);
  const displayedMovies = allMustWatchMovies
    .sort((a, b) => a.title.localeCompare(b.title))
    ? filterFunction(allMustWatchMovies)
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

    return (
    <>
      <PageTemplate
        title="Must Watch Movies"
        movies={displayedMovies}
        increment={() => {}}
        decrement={() => {}}
        action={(movie) => {
          return (
            <>
              <RemoveFromMustWatchMovies {...movie} />
              <WriteReview {...movie} />
            </>
          );
        }}
        showGenreSearch={false}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default MustWatchMoviesPage;