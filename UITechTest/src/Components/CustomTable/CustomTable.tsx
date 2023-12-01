import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ReviewModal from "../ReviewModal/ReviewModal";
import { useMediaQuery } from "@mui/material";
import ReviewForm from "../ReviewForm/ReviewForm";
import {
  CustomTableProps,
  ReviewResponse,
  TableRowData,
} from "./CustomTable.types";
import useSubmitReview from "../../Hooks/useSubmit";

const ColourPallete = {
  lightBlue: "#77B6DF",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ theme, selected }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: selected
      ? ColourPallete.lightBlue
      : theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  cursor: "pointer",
  backgroundColor: selected ? ColourPallete.lightBlue : "inherit",
  "&:hover": {
    backgroundColor: ColourPallete.lightBlue,
  },
}));

enum SortDirection {
  ASC = 1,
  DESC = -1,
}

const CustomTable: React.FC<CustomTableProps> = ({ headers, rows }) => {
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const { error, submitReview } = useSubmitReview(
    "http://localhost:3000/submitReview"
  );

  const [sortDirection, setSortDirection] = React.useState<SortDirection>(
    SortDirection.ASC
  );
  const [sortedRows, setSortedRows] = React.useState<TableRowData[]>(rows);

  const getCompanyById = (companyId: string) => {
    return companyId;
  };

  const handleSort = () => {
    const newDirection =
      sortDirection === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;

    const sorted = [...sortedRows].sort((a, b) => {
      const scoreA = parseFloat(String(a[1]));
      const scoreB = parseFloat(String(b[1]));
      return (scoreA - scoreB) * newDirection;
    });
    setSortDirection(newDirection);
    setSortedRows(sorted);
  };

  const handleReviewSubmission = (review: string) => {
    submitReview(review, (data: ReviewResponse | null) => {
      if (data && data.message) {
        alert(data.message);
      } else {
        alert(error);
      }
    });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <StyledTableCell key={index}>
                  {index === 1 ? (
                    <>
                      {header}
                      <button onClick={handleSort} type="button">
                        {sortDirection === SortDirection.ASC ? "↑" : "↓"}
                      </button>
                    </>
                  ) : (
                    header
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row: TableRowData, rowIndex: number) => (
              <StyledTableRow
                key={rowIndex}
                onClick={() => setSelectedRow(rowIndex)}
                selected={selectedRow === rowIndex}
              >
                {Object.entries(row).map(([key, cell], cellIndex) => (
                  <StyledTableCell key={cellIndex} align="left">
                    {key === "filmCompanyId"
                      ? getCompanyById(cell as string)
                      : cell}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRow !== null && (
        <>
          {isSmallScreen ? (
            <ReviewModal
              onSubmitReview={handleReviewSubmission}
              selectedRow={selectedRow}
              rows={rows}
            />
          ) : (
            <ReviewForm
              onSubmitReview={handleReviewSubmission}
              selectedRow={selectedRow}
              rows={rows}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CustomTable;
