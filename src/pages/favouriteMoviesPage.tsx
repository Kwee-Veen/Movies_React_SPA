import React, { useContext, useEffect } from "react"
import PageTemplate from "../components/templateMovieListPage";
import { useQueries, UseQueryResult } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { getMovieFavouriteIDs } from "../api/supabase-db";
import { MoviesContext } from "../contexts/moviesContext";
import { supabase } from "../supabaseClient";

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

const FavouriteMoviesPage: React.FC = () => {
  const { movieFavouriteIDs, setMovieFavouriteIDs } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering( [titleFiltering, genreFiltering] );
  document.title = `Favourite Movies`

  // Function that queries the DB for IDs of movieFavourites and assigns the results to movieFavouriteIDs (in movieContext) 
  const loadFavourites = () => {
    getMovieFavouriteIDs().then(x => {
      let temp: number[] = [];
      x.forEach(x => temp.push(x))
      setMovieFavouriteIDs(temp);
    })
  }

  // loads initial favourites (once only)
  useEffect(() => { loadFavourites(); }, []);

  // subscribes to the movieFavourites db channel and re-loads favourites if there's any db change
  supabase.channel('table_db_changes').on('postgres_changes', 
    { event: '*', schema: 'public', table: 'movieFavourites' }, 
    () => { loadFavourites(); }).subscribe();

  // Create an array of queries and run them in parallel.
  let favouriteMovieQueries: UseQueryResult<any, unknown>[] = [];
  if (movieFavouriteIDs) {
    favouriteMovieQueries = useQueries(movieFavouriteIDs.map((movieId: any) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
    );
  }

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const displayedMovies = allFavourites
    .sort((a, b) => a.title.localeCompare(b.title))
    ? filterFunction(allFavourites)
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
        title="Favourite Movies"
        movies={displayedMovies}
        increment={() => { }}
        decrement={() => { }}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites {...movie} />
              <WriteReview {...movie} />
            </>
          );
        }}
        showSearch={false}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;