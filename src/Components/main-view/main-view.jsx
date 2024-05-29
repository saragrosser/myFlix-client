import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProfileView from "../profile-view/profile-view";

const MainLayout = ({
  user,
  filteredMovies,
  searchQuery,
  handleSearchChange,
}) => (
  <>
    <Row className="justify-content-md-center mb-4">
      <Col md={8}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for movies..."
          className="form-control"
        />
      </Col>
    </Row>
    <Row>
      {filteredMovies.length === 0 ? (
        <Col>No movies found!</Col>
      ) : (
        filteredMovies.map((movie) => (
          <Col key={movie._id} md={3} sm={12} className="mb-3">
            <MovieCard movie={movie} />
          </Col>
        ))
      )}
    </Row>
  </>
);

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch("https://movie-ghibli-api-60afc8eabe21.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          title: movie.Title,
          description: movie.Description,
          image: movie.ImagePath,
          director: movie.Director,
          genre: movie.Genre,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [token]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery)
  );

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Routes>
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignupView />}
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <LoginView onLoggedIn={(user) => setUser(user)} />
            )
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <MovieView movies={filteredMovies} />
            )
          }
        />
        <Route
          path="/"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <MainLayout
                user={user}
                filteredMovies={filteredMovies}
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
              />
            )
          }
        />
        <Route
          path="/profile"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <ProfileView
                localUser={user}
                movies={filteredMovies}
                token={token}
              />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
