// import the PropTypes library and Button from react-bootsrap
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

//destructered prop - movie is the name of the prop in main-view.jsx
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genre}</Card.Text>

        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

// Define PropTypes for the MovieCard component
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    director: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
