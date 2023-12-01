import { useState, useEffect } from "react";

interface MovieCompany {
  id: string;
  name: string;
}

interface MovieCompaniesResponse {
  movieCompanies: MovieCompany[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useMovieCompanies = (): MovieCompaniesResponse => {
  const [movieCompanies, setMovieCompanies] = useState<MovieCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const maxRetries = 3;

  const fetchMovieCompanies = async (): Promise<void> => {
    setLoading(true);
    let retries = 0;
    const maxDelay = 3000;

    while (retries < maxRetries) {
      try {
        const response = await fetch("http://localhost:3000/movieCompanies");
        if (!response.ok) {
          throw new Error("Failed to fetch movie companies");
        }
        const data: MovieCompany[] = await response.json();
        setMovieCompanies(data);
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
    fetchMovieCompanies();
  }, []);

  const refetch = () => {
    fetchMovieCompanies();
  };

  return { movieCompanies, loading, error, refetch };
};

export default useMovieCompanies;
