import { useState, useEffect } from "react";

interface MovieCompany {
  id: string;
  name: string;
}

const useMovieCompanies = (): {
  movieCompanies: MovieCompany[];
  loading: boolean;
  error: string | null;
} => {
  const [movieCompanies, setMovieCompanies] = useState<MovieCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const maxRetries = 3;

  useEffect(() => {
    let retries = 0;

    const fetchMovieCompanies = async (): Promise<void> => {
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
        }
      }
      setLoading(false);
    };

    fetchMovieCompanies();
  }, []);

  return { movieCompanies, loading, error };
};

export default useMovieCompanies;
