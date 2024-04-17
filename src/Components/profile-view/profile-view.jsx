import React, { useEffect, useState } from "react";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { FavouriteMovies } from "./favourite-movies";
import { Card, Container, Row, Col } from "react-bootstrap";

export const ProfileView = ({ localUser, token, movies }) => {
  const [user, setUser] = useState(localUser);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch(
      "https://movie-ghibli-api-60afc8eabe21.herokuapp.com/users/" +
        localUser.username,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setFavoriteMovies(
          movies.filter((m) => data.FavoriteMovies.includes(m._id))
        );
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token, movies, localUser.username]);

  const handleFavorite = (movieId) => {
    const isFavorite = user.FavoriteMovies.includes(movieId);
    const updatedFavorites = isFavorite
      ? user.FavoriteMovies.filter((id) => id !== movieId)
      : [...user.FavoriteMovies, movieId];

    fetch(
      "https://movie-ghibli-api-60afc8eabe21.herokuapp.com/users/" +
        user.username +
        "/movies",
      {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId: movieId }),
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser);
        setFavoriteMovies(
          movies.filter((m) => updatedUser.FavoriteMovies.includes(m._id))
        );
      })
      .catch((error) => console.error("Failed to update favorites:", error));
  };

  const handleUpdateUser = (updatedData) => {
    fetch(
      "https://movie-ghibli-api-60afc8eabe21.herokuapp.com/users/" +
        user.username,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Failed to update user:", error);
        alert("Failed to update profile.");
      });
  };

  const handleDeregister = () => {
    fetch(
      "https://movie-ghibli-api-60afc8eabe21.herokuapp.com/users/" +
        user.username,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Account deleted successfully.");
          localStorage.clear();
          window.location.reload();
        } else {
          alert("Failed to delete account.");
        }
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body>
              <UserInfo user={user} />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <UpdateUser
                user={user}
                onUpdate={handleUpdateUser}
                onDeregister={handleDeregister}
              />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <FavouriteMovies
                movies={favoriteMovies}
                handleFavorite={handleFavorite}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
