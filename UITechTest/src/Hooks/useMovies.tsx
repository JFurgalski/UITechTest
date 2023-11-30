import { useState, useEffect } from "react";

interface Movie {
  id: string;
  reviews: number[];
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
}

const useMovies = (): {
  movies: Movie[];
  loading: boolean;
  error: string | null;
} => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const maxRetries = 3;

  useEffect(() => {
    let retries = 0;

    const fetchMovies = async (): Promise<void> => {
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
        }
      }
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

export default useMovies;
