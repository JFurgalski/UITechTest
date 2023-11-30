import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import styles from './TableComponent.module.css'


interface CustomTableProps {
  headers: string[];
  rows: any[][];
}

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
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    cursor: "pointer",
    backgroundColor: selected ? "#e0e0e0" : "inherit",
    "&:hover": {
      backgroundColor: selected ? "#e0e0e0" : theme.palette.action.hover,
    },
  }));

const CustomTable: React.FC<CustomTableProps> = ({ headers, rows }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  const getCompanyById = (companyId: string) => {
    return companyId;
  };

  const renderReviewForm = () => {
    if (selectedRow !== null) {
      const selectedMovie = rows[selectedRow];
      return (
        <div>
          <h3>Leave a Review for {selectedMovie[0]}</h3>
          <form>
            <label>
              Review:
              <textarea rows={4} cols={50} />
            </label>
            <br />
            <input type="submit" value="Submit Review" />
          </form>
        </div>
      );
    }
    return null;
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
      {renderReviewForm()}
    </div>
  );
};

export default CustomTable;
