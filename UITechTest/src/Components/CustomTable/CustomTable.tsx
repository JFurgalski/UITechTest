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
import { CustomTableProps } from "./CustomTable.types";

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
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(
    SortDirection.ASC
  );
  const [sortedRows, setSortedRows] = React.useState<any[]>(rows);

  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  const getCompanyById = (companyId: string) => {
    return companyId;
  };

  const submitReview = (review: string) => {
    fetch("http://localhost:3000/submitReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSort = () => {
    const newDirection =
      sortDirection === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;

    const sorted = [...sortedRows].sort((a, b) => {
      const scoreA = parseFloat(a[1]);
      const scoreB = parseFloat(b[1]);
      return (scoreA - scoreB) * newDirection;
    });

    setSortDirection(newDirection);
    setSortedRows(sorted);
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
            {sortedRows.map((row, rowIndex) => (
              <StyledTableRow
                key={rowIndex}
                onClick={() => setSelectedRow(rowIndex)}
                selected={selectedRow === rowIndex}
              >
                {row.map((cell, cellIndex) => (
                  <StyledTableCell key={cellIndex} align="left">
                    {cellIndex === 2 ? getCompanyById(cell) : cell}
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
              onSubmitReview={submitReview}
              selectedRow={selectedRow}
              rows={rows}
            />
          ) : (
            <ReviewForm
              onSubmitReview={submitReview}
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
