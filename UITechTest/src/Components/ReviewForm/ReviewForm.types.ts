import { MovieSummary } from "../CustomTable/CustomTable.types";

export interface ReviewFormProps {
  onSubmitReview: (review: string) => void;
  selectedRow: number | null;
  rows: MovieSummary[];
}
