import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Box } from "@mui/material/";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BookListView() {
  const [authors, setAuthors] = useState([]);
  const theme = useTheme();

  function fetchData() {
    fetch(`http://localhost:3500/authors/`)
      .then((response) => response.json())
      .then((authors) => {
        setAuthors(authors);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function deleteAuthor(author) {
    fetch(`http://localhost:3500/authors/${author.id}`, {
      method: "DELETE",
    }).then(() => fetchData());
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <StyledTableRow key={author.name}>
                <StyledTableCell>{author.name}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton onClick={() => deleteAuthor(author)} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          component={Link}
          to="/authors/create"
          sx={{ backgroundColor: theme.palette.primary.light }}
        >
          Add a new author
        </Button>
      </Box>
    </Box>
  );
}
