import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const MovieContext = createContext();

const API_KEY = ''; // OMDb API Key

const MovieApp = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState();
  const [search, setSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');

  const fetchMovies = async (searchValue) => {
    const response = await axios(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`
    );
    const data = response.data;
    setMovies(data.Search);
  };

  const removeFavoriteMovie = (movie) => {
    movie.isFavorite = false;
    const newFavoriteList = favorites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
  };

  const addFavoriteMovie = (movie) => {
    movie.isFavorite = true;
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
  };

  const favoriteHandler = (movie, e) => {
    e.preventDefault();
    if (favorites.includes(movie)) {
      removeFavoriteMovie(movie);
    } else {
      addFavoriteMovie(movie);
    }
  };

  const showDetail = async (id) => {
    const response = await axios(
      `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
    );

    //http://www.omdbapi.com/?i=tt3896198&apikey=bf93d12b
    const data = response.data;
    setSelectedMovie(data);
    console.log(data);
  };

  useEffect(() => {
    fetchMovies(search);
  }, [search]);

  return (
    <MovieContext.Provider
      value={{
        setSearch,
        movies,
        favorites,
        favoriteHandler,
        showDetail,
        selectedMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieApp;
