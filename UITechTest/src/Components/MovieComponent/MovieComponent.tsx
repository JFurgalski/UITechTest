import React from "react";
import useMovieCompanies from "../../Hooks/useMovieCompanies";
import useMovies from "../../Hooks/useMovies";
import Title from "../Title/Title";
import CustomTable from "../CustomTable/CustomTable";
import MovieCounter from "../MovieCounter/MovieCounter";
import CustomButton from "../Button/CustomButton";

const MovieComponent: React.FC = () => {
  const {
    movieCompanies,
    loading: companiesLoading,
    error: companiesError,
    refetch: refetchCompanies,
  } = useMovieCompanies();
  const {
    movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
  } = useMovies();

  const handleRefresh = () => {
    refetchCompanies();
    refetchMovies();
  };

  if (companiesLoading || moviesLoading) {
    return <div>Loading...</div>;
  }

  if (companiesError || moviesError) {
    return <div>Error: {companiesError || moviesError}</div>;
  }

  const getCompanyById = (companyId: string) => {
    const company = movieCompanies.find((c) => c.id === companyId);
    return company ? company.name : "Unknown";
  };

  const calculateAverageScore = (reviews: number[]) => {
    const sum = reviews.reduce((total, score) => total + score, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const headers: string[] = [
    "Title",
    "Avg. Review Score",
    "Production Company",
  ];
  const tableRows: any[][] = movies.map((movie) => [
    movie.title,
    calculateAverageScore(movie.reviews),
    getCompanyById(movie.filmCompanyId),
  ]);

  return (
    <div>
      <CustomButton onChange={handleRefresh} buttonTitle="Refresh The List" />
      <Title title="Movie Information" />
      <MovieCounter moviesLength={movies.length} />
      <CustomTable headers={headers} rows={tableRows} />
    </div>
  );
};

export default MovieComponent;
