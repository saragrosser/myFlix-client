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

  useEffect(() => {
    const addToFavorites = () => {
      fetch(
        `https://movie-ghibli-api-60afc8eabe21.herokuapp.com/users/${
          user.username
        }/movies/${encodeURIComponent(movie.title)}`,
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
          alert("Movie added to favorites successfully!");
          window.location.reload();
          return response.json();
        })
        .then((updatedUser) => {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const removeFromFavorites = () => {
      fetch(
        `https://movie-ghibli-api-60afc8eabe21.herokuapp.com/users/${
          user.username
        }/movies/${encodeURIComponent(movie.title)}`,
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
            throw new Error("Failed to remove movie from favorites.");
          }
          alert("Movie removed from favorites successfully!");
          window.location.reload();
          return response.json();
        })
        .then((user) => {
          if (user) {
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (addTitle) {
      addToFavorites();
    }
    if (delTitle) {
      removeFromFavorites();
    }
  }, [addTitle, delTitle, token, user.username]);

  const handleAddToFavorites = () => {
    setAddTitle(movie.title);
  };
  const handleRemoveFromFavorites = () => {
    setDelTitle(movie.title);
  };

  return (
    <>
      <Card className="h-100 mt-5 card-shadow">
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Card.Img variant="top" src={movie.image} className="card-img" />
          <Card.Body>
            <Card.Title className="card-title">{movie.title}</Card.Title>
            <Card.Text className="card-text">{movie.genre.Name}</Card.Text>
          </Card.Body>
        </Link>
      </Card>
      {isFavorite ? (
        <Button
          className="fav-button"
          variant="primary"
          onClick={handleRemoveFromFavorites}
        >
          Remove
        </Button>
      ) : (
        <Button
          className="fav-button"
          variant="primary"
          onClick={handleAddToFavorites}
        >
          Add
        </Button>
      )}
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
