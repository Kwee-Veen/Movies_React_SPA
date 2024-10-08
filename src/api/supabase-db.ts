// import { User } from "../types/interfaces";
import { supabase } from "../supabaseClient";

// NOTE: Decided against this approach for logging in and went with Google OAuth. This would've been hilariously insecure. Keeping it in this commit for reference, will delete later.
// export const getUsers = async () => {
//   const { data: users, error } = await supabase.from('users').select('firstName, lastName, email, password');
//   if (users) {
//     let ret: User[] = users;
//     return ret;
//   } 
//   else throw new Error(`Unable to fetch users from Supabase. Error: ${error}`);
// };

export const getMovieFavouriteIDs = async () => {
  const { data: movieFavourites, error } = await supabase.from('movieFavourites').select('movieId')
  if (movieFavourites) {
    let ret: number[] = [];
    movieFavourites.forEach(x => { ret.push(x.movieId); })
    console.log(ret);
    return ret;
  
  } else
    throw new Error(`Unable to fetch movieFavourites from Supabase. Error: ${error}`);
};

export const addToFavourites = async (newFavouriteMovieId: number) => {
  const { error } = await supabase
    .from('movieFavourites')
    .insert([ { movieId: newFavouriteMovieId, userId: 1 } ])
    .select('movieId');

  if (error?.message) throw new Error(`Unable to add movie to db favourites. Error: ${error?.message}`);
  else console.log(`Added movie to db favourites. Id: ${newFavouriteMovieId}`); ;
};

export const removeFromFavourites = async (removeFavouriteMovieId: number) => {
  const { error } = await supabase
    .from('movieFavourites')
    .delete()
    .eq('movieId', removeFavouriteMovieId)

  if (error?.message) throw new Error(`Unable to remove movie from db favourites. Error: ${error?.message}`);
  else console.log(`Removed movie from db favourites. Id: ${removeFavouriteMovieId}`); 
};

export const getTVFavouriteIDs = async () => {
  const { data: tvFavourites, error } = await supabase.from('tvFavourites').select('tvId')
  if (tvFavourites) {
    let ret: number[] = [];
    tvFavourites.forEach(x => { ret.push(x.tvId); })
    console.log(ret);
    return ret;
  
  } else
    throw new Error(`Unable to fetch tvFavourites from Supabase. Error: ${error}`);
};

export const addToTVFavourites = async (newFavouriteTVId: number) => {
  const { error } = await supabase
    .from('tvFavourites')
    .insert([ { tvId: newFavouriteTVId, userId: 1 } ])
    .select('tvId');

  if (error?.message) throw new Error(`Unable to add tv series to db favourites. Error: ${error?.message}`);
  else console.log(`Added tv to db favourites. Id: ${newFavouriteTVId}`); ;
};

export const removeFromTVFavourites = async (removeFavouriteTVId: number) => {
  const { error } = await supabase
    .from('tvFavourites')
    .delete()
    .eq('tvId', removeFavouriteTVId)

  if (error?.message) throw new Error(`Unable to remove tv series from db favourites. Error: ${error?.message}`);
  else console.log(`Removed tv from db favourites. Id: ${removeFavouriteTVId}`); 
};

export const getMustWatchMovieIDs = async () => {
  const { data: mustWatchMovies, error } = await supabase.from('mustWatchMovies').select('movieId')
  if (mustWatchMovies) {
    let ret: number[] = [];
    mustWatchMovies.forEach(x => { ret.push(x.movieId); })
    console.log(ret);
    return ret;
  
  } else
    throw new Error(`Unable to fetch must-watch movies from Supabase. Error: ${error}`);
};

export const addToMustWatchMovies = async (newMustWatchMovieID: number) => {
  const { error } = await supabase
    .from('mustWatchMovies')
    .insert([ { movieId: newMustWatchMovieID, userId: 1 } ])
    .select('movieId');

  if (error?.message) throw new Error(`Unable to add movie to db must watch movies list. Error: ${error?.message}`);
  else console.log(`Added movie to db must watch movies list. Id: ${newMustWatchMovieID}`); ;
};

export const removeFromMustWatchMovies = async (removeMustWatchMovieID: number) => {
  const { error } = await supabase
    .from('mustWatchMovies')
    .delete()
    .eq('movieId', removeMustWatchMovieID)

  if (error?.message) throw new Error(`Unable to remove movie from db must watch movies list. Error: ${error?.message}`);
  else console.log(`Removed movie to db must watch movies list. Id: ${removeMustWatchMovieID}`); 
};

