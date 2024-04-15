// Import React and useState hook
import React, { useState, useEffect } from "react";
import { MovieCard } from "./Components/movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) return;
    fetch("https://movie-ghibli-api-60afc8eabe21.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((moviesData) => {
        console.log("Movies data: ", moviesData);
        setMovies(
          moviesData.map((movie) => ({
            id: movie._id,
            title: movie.title,
            description: movie.description,
            image: movie.image,
            director: movie.director,
            genre: movie.Genre,
          }))
        );
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [token]);

  if (!user) {
    return (
      <Row className="justify-content-md-center">
        <Col md={6}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <hr />
          <SignupView />
        </Col>
      </Row>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return (
      <Row className="justify-content-md-center">
        <Col md={12}>
          <div>The list is empty!</div>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      {movies.map((movie) => (
        <Col key={movie.id} md={3} className="mb-3">
          <MovieCard
            movie={movie}
            onMovieClick={() => setSelectedMovie(movie)}
          />
        </Col>
      ))}
      <Col md={12}>
        <Button
          variant="secondary"
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </Button>
      </Col>
    </Row>
  );
};
