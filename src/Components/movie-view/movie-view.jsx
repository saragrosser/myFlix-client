import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) return <div>Movie not found!</div>; // Handle case where movie is not found

  return (
    <div className="movie-view">
      <div className="movie-poster">
        <img src={movie.imagePath} alt={`The cover of ${movie.title}`} />
      </div>
      <div className="movie-title">
        <span className="label">Title: </span>
        <span className="value">{movie.title}</span>
      </div>
      <div className="movie-description">
        <span className="label">Description: </span>
        <span className="value">{movie.description}</span>
      </div>
      <div className="movie-genre">
        <span className="label">Genre: </span>
        <span className="value">{movie.genre.Name}</span>
      </div>
      <div className="movie-director">
        <span className="label">Director: </span>
        <span className="value">{movie.director.Name}</span>
      </div>
      <Link to="/">
        <button type="button" className="btn btn-primary back-button">
          Back
        </button>
      </Link>
    </div>
  );
};
