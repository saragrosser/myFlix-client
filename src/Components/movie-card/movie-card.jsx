import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, onFavoriteToggle, isFavorite }) => {
  const storedToken = localStorage.getItem("token");

  const handleFavoriteClick = () => {
    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://movie-ghibli-api-60afc8eabe21.herokuapp.com/users/${
      movie._id
    }/${isFavorite ? "remove" : "add"}Favorite`;

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update favorites");
        }
        return response.json();
      })
      .then(() => {
        onFavoriteToggle(movie._id); // Assuming onFavoriteToggle updates the state in the parent component
      })
      .catch((error) => {
        console.error("Error updating favorite status:", error);
        alert("Failed to update favorites.");
      });
  };

  return (
    <Card className="mb-3">
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card.Img variant="top" src={movie.imagePath} />
      </Link>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Button
          variant="link"
          as={Link}
          to={`/movies/${encodeURIComponent(movie._id)}`}
        >
          Open
        </Button>
        <Button
          variant={isFavorite ? "danger" : "success"}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
  }).isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
