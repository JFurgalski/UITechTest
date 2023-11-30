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
    backgroundColor: selected ? "#77B6DF" : theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  cursor: "pointer",
  backgroundColor: selected ? "#77B6DF" : "inherit",
  "&:hover": {
    backgroundColor: selected ? "#77B6DF" : "#77B6DF",
  },
}));

const CustomTable: React.FC<CustomTableProps> = ({ headers, rows }) => {
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

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
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <StyledTableCell key={index}>{header}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <StyledTableRow
                key={rowIndex}
                onClick={() => handleRowClick(rowIndex)}
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
