// Import React and useState hook
import React, { useState, useEffect } from "react";
import { MovieCard } from "./Components/movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  // Studio Ghibli movies data
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div className="main-view">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.title}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
