import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, isFavorite }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [addTitle, setAddTitle] = useState("");
  const [delTitle, setDelTitle] = useState("");

  const handleAddToFavorites = () => {
    fetch(
      `https://movie-ghibli-api-60afc8eabe21.herokuapp.com/users/${
        user.Username
      }/movies/${encodeURIComponent(movie._id)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie to favorites.");
        }
        return response.json();
      })
      .then((updatedUser) => {
        alert("Movie added to favorites successfully!");
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      })
      .catch((error) => {
        console.error("Failed to add movie to favorites:", error);
        alert(error.message);
      });
  };

  const handleRemoveFromFavorites = (movieId) => {
    fetch(
      `https://movie-ghibli-api-60afc8eabe21.herokuapp.com/users/${
        user.Username
      }/movies/${encodeURIComponent(movie._id)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          // Attempt to read the response text and throw it as an error
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json(); // Assume JSON response on successful deletion
      })
      .then((updatedUser) => {
        alert("Movie removed from favorites successfully!");
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser); // Update the local user state
      })
      .catch((error) => {
        console.error("Failed to remove movie from favorites:", error);
        alert(`Failed to remove movie from favorites: ${error.message}`);
      });
  };

  return (
    <>
      <Card className="h-100 mt-5 card-shadow">
        <Card.Img variant="top" src={movie.image} className="card-img" />
        <Card.Body>
          {/* Wrap only the Card.Title with the Link */}
          <Card.Title className="card-title">
            <Link
              to={`/movies/${encodeURIComponent(movie._id)}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {movie.title}
            </Link>
          </Card.Title>
          <Card.Text className="card-text">{movie.genre.Name}</Card.Text>
          {/* Display the appropriate button based on whether the movie is a favorite */}
          {isFavorite ? (
            <Button
              className="remove-button"
              variant="danger"
              onClick={handleRemoveFromFavorites}
            >
              Remove from Favorites
            </Button>
          ) : (
            <Button
              className="fav-button"
              variant="primary"
              onClick={handleAddToFavorites}
            >
              Add to Favorites
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

movie: PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string,
  genre: PropTypes.shape({
    Name: PropTypes.string,
  }),
  director: PropTypes.string,
  featured: PropTypes.bool,
}).isRequired;
