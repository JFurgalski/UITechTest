interface MovieData {
    id: string;
    reviews: number[];
    title: string;
    filmCompanyId: string;
    cost: number;
    releaseYear: number;
  }
  
  interface MovieCompany {
    id: string;
    name: string;
  }
  
  export interface CustomTableProps {
    headers: string[];
    rows: any[][];
  }