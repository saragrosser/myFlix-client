// Import React and useState hook
import React, { useState, useEffect } from "react";
import { MovieCard } from "./Components/movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  // Studio Ghibli movies data
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://movie-ghibli-api-60afc8eabe21.herokuapp.com/movies")
      .then((response) => response.json())
      .then((moviesData) => {
        const moviesFromApi = moviesData.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            description: movie.description,
            image: movie.image,
            director: movie.director,
            // Add any other movie details to include
          };
        });

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error);
      });
  }, []);

  if (!user) {
    return <LoginView onLoggedIn={(user) => setUser(user)} />;
  }

  if (selectedMovie) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          Logout
        </button>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          Logout
        </button>
        <div>The list is empty!</div>
      </>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          setUser(null);
        }}
      >
        Logout
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id} //movies have a unique "_id" field
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
