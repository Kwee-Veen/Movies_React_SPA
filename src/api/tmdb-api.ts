export const getContent = (medium: string, page: number = 1, voteAverageParam?: number, genreId?: number | string, sortByParam?: string) => {
  if (page < 1) { page = 1}

  let genre: string = '';
  if (genreId) {genre = `&with_genres=${genreId}`}
  let voteAverage: string = '';
  if (voteAverageParam) {voteAverage = `&vote_average.gte=${voteAverageParam}`}
  let sortBy: string = '';
  if (sortByParam) {sortBy = `&sort_by=${sortByParam}`}

  return fetch(
    `https://api.themoviedb.org/3/discover/${medium}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}${sortBy}${voteAverage}${genre}`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch ${medium} page ${page} ${genre} ${voteAverage}. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie data. Response status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getTVSeries = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get tv data. Response status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
  ).then( (response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

// passes in either 'movie' or 'tv' as the second parameter
export const getImages = (id: string | number, movieOrTV: string) => {
  return fetch(
    `https://api.themoviedb.org/3/${movieOrTV}/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("failed to fetch images");
    }
    return response.json();
  }).then((json) => json.posters)
    .catch((error) => {
      throw error
    });
};

export const getMovieReviews = (id: string | number) => { 
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getTVReviews = (id: string | number) => { 
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getUpcomingMovies = (page: number = 1) => {
  if (page < 1) { page = 1}
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch upcoming movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getPopularMovies = (page: number = 1) => {
  if (page < 1) { page = 1}
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch popular movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getTrendingTV = (page: number = 1) => {
  if (page < 1) { page = 1}
  return fetch(
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch trending TV. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};