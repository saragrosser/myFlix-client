// Import React and useState hook
import React, { useState } from "react";
import { MovieCard } from "./Components/movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  // Studio Ghibli movies data
  const [movies, setMovies] = useState([
    {
      title: "My Neighbor Totoro",
      description:
        "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.",
      image: "https://m.media-amazon.com/images/I/91Rd6IjcSWL._SY466_.jpg",
    },
    {
      title: "Spirited Away",
      description:
        "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
      image: "https://m.media-amazon.com/images/I/612y4XapwkL._AC_SX679_.jpg",
    },
    {
      title: "Princess Mononoke",
      description:
        "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony.",
      image: "https://m.media-amazon.com/images/I/81jSJRqb9IL._SY466_.jpg",
    },
    {
      title: "Howl's Moving Castle",
      description:
        "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.",
      image: "https://m.media-amazon.com/images/I/61SVQF6opUL._AC_SX679_.jpg",
    },
    // Add more movie objects when needed
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
