import React, { useState, useCallback } from "react";

interface MovieContextInterface {
  popularMoviesPageCount: number;
  incrementPopularMoviesPageCount: (() => void);
  decrementPopularMoviesPageCount: (() => void);
  upcomingMoviesPageCount: number;
  incrementUpcomingMoviesPageCount: (() => void);
  decrementUpcomingMoviesPageCount: (() => void);
  moviesPageCount: number;
  incrementMoviesPageCount: (() => void);
  decrementMoviesPageCount: (() => void);
  tvPageCount: number;
  incrementTVPageCount: (() => void);
  decrementTVPageCount: (() => void);
  trendingTVPageCount: number;
  incrementTrendingTVPageCount: (() => void);
  decrementTrendingTVPageCount: (() => void);
  moviesSearchPageCount: number;
  setMoviesSearchPageCount: ((number: number) => void);
  incrementMoviesSearchPageCount: (() => void);
  decrementMoviesSearchPageCount: (() => void);
  tvSearchPageCount: number;
  setTVSearchPageCount: ((number: number) => void);
  incrementTVSearchPageCount: (() => void);
  decrementTVSearchPageCount: (() => void);
  currentPageIsMovie: number; 
  setCurrentPageIsMovie: ((number: number) => void);
}
const initialContextState: MovieContextInterface = {
  popularMoviesPageCount: 1,
  incrementPopularMoviesPageCount: () => { },
  decrementPopularMoviesPageCount: () => { },
  upcomingMoviesPageCount: 1,
  incrementUpcomingMoviesPageCount: () => { },
  decrementUpcomingMoviesPageCount: () => { },
  moviesPageCount: 1,
  incrementMoviesPageCount: () => { },
  decrementMoviesPageCount: () => { },
  tvPageCount: 1,
  incrementTVPageCount: () => { },
  decrementTVPageCount: () => { },
  trendingTVPageCount: 1,
  incrementTrendingTVPageCount: () => { },
  decrementTrendingTVPageCount: () => { },
  moviesSearchPageCount: 1,
  setMoviesSearchPageCount: () => { },
  incrementMoviesSearchPageCount: () => { },
  decrementMoviesSearchPageCount: () => { },
  tvSearchPageCount: 1,
  setTVSearchPageCount: () => { },
  incrementTVSearchPageCount: () => { },
  decrementTVSearchPageCount: () => { },
  currentPageIsMovie: 1, 
  setCurrentPageIsMovie:  () => { },
};

export const PagesContext = React.createContext<MovieContextInterface>(initialContextState);

const PagesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [popularMoviesPageCount, setPopularMoviesPageCount] = useState<number>(1);

  const incrementPopularMoviesPageCount = useCallback(() => {
    setPopularMoviesPageCount((popularMoviesPageCount) => (popularMoviesPageCount + 1));
  }, []);

  const decrementPopularMoviesPageCount = useCallback(() => {
    setPopularMoviesPageCount((popularMoviesPageCount) => (popularMoviesPageCount - 1));
  }, []);

  const [upcomingMoviesPageCount, setUpcomingMoviesPageCount] = useState<number>(1);

  const incrementUpcomingMoviesPageCount = useCallback(() => {
    setUpcomingMoviesPageCount((upcomingMoviesPageCount) => (upcomingMoviesPageCount + 1));
  }, []);

  const decrementUpcomingMoviesPageCount = useCallback(() => {
    setUpcomingMoviesPageCount((upcomingMoviesPageCount) => (upcomingMoviesPageCount - 1));
  }, []);

  const [moviesPageCount, setMoviesPageCount] = useState<number>(1);

  const incrementMoviesPageCount = useCallback(() => {
    setMoviesPageCount((moviesPageCount) => (moviesPageCount + 1));
  }, []);

  const decrementMoviesPageCount = useCallback(() => {
    setMoviesPageCount((moviesPageCount) => (moviesPageCount - 1));
  }, []);

  const [moviesSearchPageCount, setMoviesSearchPageCount] = useState<number>(1);

  const incrementMoviesSearchPageCount = useCallback(() => {
    setMoviesSearchPageCount((moviesSearchPageCount) => (moviesSearchPageCount + 1));
  }, []);

  const decrementMoviesSearchPageCount = useCallback(() => {
    setMoviesSearchPageCount((moviesSearchPageCount) => (moviesSearchPageCount - 1));
  }, []);

  const [tvPageCount, setTVPageCount] = useState<number>(1);

  const incrementTVPageCount = useCallback(() => {
    setTVPageCount((tvPageCount) => (tvPageCount + 1));
  }, []);

  const decrementTVPageCount = useCallback(() => {
    setTVPageCount((tvPageCount) => (tvPageCount - 1));
  }, []);

  const [trendingTVPageCount, setTrendingTVPageCount] = useState<number>(1);

  const incrementTrendingTVPageCount = useCallback(() => {
    setTrendingTVPageCount((trendingTVPageCount) => (trendingTVPageCount + 1));
  }, []);

  const decrementTrendingTVPageCount = useCallback(() => {
    setTrendingTVPageCount((trendingTVPageCount) => (trendingTVPageCount - 1));
  }, []);

  const [tvSearchPageCount, setTVSearchPageCount] = useState<number>(1);

  const incrementTVSearchPageCount = useCallback(() => {
    setTVSearchPageCount((tvSearchPageCount) => (tvSearchPageCount + 1));
  }, []);

  const decrementTVSearchPageCount = useCallback(() => {
    setTVSearchPageCount((tvSearchPageCount) => (tvSearchPageCount - 1));
  }, []);

  const [currentPageIsMovie, setCurrentPageIsMovie] = useState<number>(1);

  return (
    <PagesContext.Provider
      value={{
        popularMoviesPageCount,
        incrementPopularMoviesPageCount,
        decrementPopularMoviesPageCount,
        upcomingMoviesPageCount,
        incrementUpcomingMoviesPageCount,
        decrementUpcomingMoviesPageCount,
        moviesPageCount,
        incrementMoviesPageCount,
        decrementMoviesPageCount,
        tvPageCount,
        incrementTVPageCount,
        decrementTVPageCount,
        trendingTVPageCount,
        incrementTrendingTVPageCount,
        decrementTrendingTVPageCount,
        moviesSearchPageCount,
        setMoviesSearchPageCount,
        incrementMoviesSearchPageCount,
        decrementMoviesSearchPageCount,
        tvSearchPageCount,
        setTVSearchPageCount,
        incrementTVSearchPageCount,
        decrementTVSearchPageCount,
        currentPageIsMovie, 
        setCurrentPageIsMovie,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
}

export default PagesContextProvider;