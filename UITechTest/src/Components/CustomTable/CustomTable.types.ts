export interface TableRowData {
  id: string;
  reviews: number[];
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
  companyName: string;
}

export interface CustomTableProps {
  headers: string[];
  rows: TableRowData[];
}
