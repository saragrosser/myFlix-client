import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import moment from "moment";
import PropTypes from "prop-types";

const ProfileView = ({ localUser, movies, token }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    birthDate: user.birthDate
      ? moment(user.birthDate).format("YYYY-MM-DD")
      : "",
    password: "", // Do not prefill passwords for security reasons
  });
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const handleRemoveFromFavorites = (movieId) => {
    fetch(
      `https://movie-ghibli-api-60afc8eabe21.herokuapp.com/users/${
        user.Username
      }/movies/${encodeURIComponent(movieId)}`,
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
        // return response.json(); // Assume JSON response on successful deletion
      })
      .then(() => {
        console.log(user.FavoriteMovies, "FavoriteMovies");
        const newFavorites = user?.FavoriteMovies?.filter(
          (id) => id != movieId
        );
        const newUserData = {
          ...user,
          FavoriteMovies: newFavorites,
        };
        localStorage.setItem("user", JSON.stringify(newUserData));
        console.log(newUserData, "newUserData");
        setUser(newUserData); // Update the local user state
        setFavoriteMovies(
          movies.filter(
            (movie) =>
              newUserData.FavoriteMovies &&
              newUserData.FavoriteMovies.includes(movie._id)
          )
        );
        alert("Movie removed from favorites successfully!");
      })
      .catch((error) => {
        console.error("Failed to remove movie from favorites:", error);
        alert(`Failed to remove movie from favorites: ${error.message}`);
      });
  };

  useEffect(() => {
    if (!token || !localUser.Username) return; // Check if there's a valid token and username

    fetch(
      `https://movie-ghibli-api-60afc8eabe21.herokuapp.com/users/${localUser.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found or other error"); // Handle non-OK responses
        }
        return response.json();
      })
      .then((data) => {
        console.log("User data fetched:", data);
        setUser(data);
        setFormData({
          username: data.Username,
          email: data.Email,
          birthDate: moment(data.Birthday).format("YYYY-MM-DD"),
          password: "", // Keep this empty
        });
        setFavoriteMovies(
          movies.filter(
            (movie) =>
              data.FavoriteMovies && data.FavoriteMovies.includes(movie._id)
          )
        );
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  }, [token, localUser.Username, movies]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    fetch(
      `https://movie-ghibli-api-60afc8eabe21.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          // This means the server responded with a non-successful HTTP status code
          // We attempt to parse it as text since it might not be JSON
          return response.text().then((text) => {
            throw new Error(text || "Error occurred");
          });
        }
        // If the response is ok, we handle it as JSON
        return response.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Update successful");
      })
      .catch((error) => {
        console.error("Update failed:", error);
        alert(`Update failed: ${error.message}`);
      });
  };

  const handleDelete = () => {
    fetch(
      `https://movie-ghibli-api-60afc8eabe21.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          localStorage.clear();
          alert("Account deleted successfully.");
          // Handle redirect if needed, e.g., using navigate('/')
        } else {
          alert("Deletion failed.");
        }
      })
      .catch((error) => console.error("Deletion failed:", error));
  };

  return (
    <Container className="profile-container my-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Text>Username: {user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Card.Text>Birthday: {formData.birthDate}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
            <Button variant="danger" onClick={handleDelete} className="ms-2">
              Delete Account
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <h3>Favorite Movies</h3>
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <Col sm={12} md={6} lg={4} key={movie._id}>
              <MovieCard
                movie={movie}
                isFavorite={user.FavoriteMovies.includes(movie._id)}
                onAddToFavorites={() => handleAddToFavorites(movie._id)}
                handleRemoveFromFavorites={handleRemoveFromFavorites}
              />
            </Col>
          ))
        ) : (
          <p>No favorite movies to display.</p>
        )}
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  localUser: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};

export default ProfileView;
