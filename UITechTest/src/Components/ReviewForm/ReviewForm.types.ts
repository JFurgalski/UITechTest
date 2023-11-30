import { TableRowData } from "../CustomTable/CustomTable.types";

export interface ReviewFormProps {
  onSubmitReview: (review: string) => void;
  selectedRow: number | null;
  rows: TableRowData[];
}
