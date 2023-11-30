import MovieComponent from "./Components/MovieComponent/MovieComponent";
import Title from "./Components/Title/Title";

export const App = () => {
  return (
    <div>
      <Title title="Welcome to Movie database!" />
      <MovieComponent />
    </div>
  );
};
