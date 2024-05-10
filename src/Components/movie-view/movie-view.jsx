import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  console.log("Movie Id: ", movieId);

  if (!movie) return <div>Movie not found!</div>; // Handle case where movie is not found

  return (
    <div className="movie-view">
      <div className="movie-content">
        <div className="movie-image-container">
          <img
            src={movie.image}
            className="img-fluid movie-image"
            alt="Movie Poster"
          />
        </div>
        <div className="movie-info">
          <div className="movie-title">
            <span className="info-label">Title: </span>
            <span className="info-content">{movie.title}</span>
          </div>
          <div className="movie-description">
            <span className="info-label">Description: </span>
            <span className="info-content">{movie.description}</span>
          </div>
          <div className="movie-genre">
            <span className="info-label">Genre: </span>
            <span className="info-content">{movie.genre.Name}</span>
          </div>
          <div className="movie-director">
            <span className="info-label">Director: </span>
            <span className="info-content">{movie.director.Name}</span>
          </div>
          <div className="movie-featured">
            <span className="info-label">Featured: </span>
            <span className="info-content">
              {movie.featured ? "True" : "False"}
            </span>
          </div>
          <button className="fav-button">Add to Favorites</button>
        </div>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string,
      }),
      director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birth: PropTypes.string,
        Death: PropTypes.string,
      }),
    })
  ).isRequired,
};
