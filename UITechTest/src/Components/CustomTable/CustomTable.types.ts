export interface CustomTableProps {
  headers: string[];
  rows: MovieSummary[];
}

export interface MovieSummary {
  title: string;
  averageScore: string;
  companyName: string;
}

export interface ReviewResponse {
  message: string;
}
