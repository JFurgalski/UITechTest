export interface ReviewFormProps {
  onSubmitReview: (review: string) => void;
  selectedRow: number | null;
  rows: any[][];
}
