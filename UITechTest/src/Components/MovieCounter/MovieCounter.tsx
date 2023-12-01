import { MovieCounterProps } from "./MovieCounter.props";

const MovieCounter: React.FC<MovieCounterProps> = ({ moviesLength }) => {
  return (
    <div>
      <p>Total movies displayed: {moviesLength}</p>
    </div>
  );
};

export default MovieCounter;
