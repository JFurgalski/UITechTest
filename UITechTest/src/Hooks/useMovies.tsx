import { useState, useEffect } from "react";

interface Movie {
  id: string;
  reviews: number[];
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
}

interface MoviesResponse {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useMovies = (): MoviesResponse => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const maxRetries = 3;

  const fetchMovies = async (): Promise<void> => {
    setLoading(true);
    let retries = 0;
    const maxDelay = 3000;

    while (retries < maxRetries) {
      try {
        const response = await fetch("http://localhost:3000/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data: Movie[] = await response.json();
        setMovies(data);
        setLoading(false);
        return;
      } catch (error: any) {
        setError(error.message || "An error occurred");
        retries++;
        const delay = Math.pow(2, retries) * 100;
        await new Promise((resolve) =>
          setTimeout(resolve, Math.min(delay, maxDelay))
        );
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const refetch = () => {
    fetchMovies();
  };

  return { movies, loading, error, refetch };
};

export default useMovies;
