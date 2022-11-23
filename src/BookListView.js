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
import { Box } from "@mui/material/";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateBookView from "./CreateBookView";
import TablePagination from "@mui/material/TablePagination";

function BookListView() {
  const [books, setBooks] = useState([]);
  const theme = useTheme();
  const [adding, setAdding] = useState(false);
  const [errorSaving, setErrorSaving] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  function fetchData() {
    fetch(`http://localhost:3500/books/`)
      .then((response) => response.json())
      .then((books) => {
        setBooks(books);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function deleteBook(book) {
    fetch(`http://localhost:3500/books/${book.id}`, {
      method: "DELETE",
    }).then(() => fetchData());
  }

  function postBook(book) {
    fetch("http://localhost:3500/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .catch(() => setErrorSaving(true))
      .then(() => fetchData());
  }

  const booksInPage = books.slice(page * rowsPerPage, rowsPerPage * (page + 1));
  const bookList = (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>Number of pages</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booksInPage.length == 0 ? (
              <StyledTableRow key="empty">
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            ) : (
              booksInPage.map((book) => (
                <StyledTableRow key={book.title}>
                  <StyledTableCell>{book.title}</StyledTableCell>
                  <StyledTableCell>{book.authorName}</StyledTableCell>
                  <StyledTableCell>{book.numberOfPages}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton onClick={() => deleteBook(book)} edge="end">
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const pagination = (
    <TablePagination
      component="div"
      count={books.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5, 10]}
    />
  );

  return adding == false ? (
    <Box>
      {bookList}
      <Box sx={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.primary.light }}
          onClick={() => {
            setAdding(true);
          }}
        >
          Add a new book
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>{pagination}</Box>
    </Box>
  ) : (
    <Box>
      {bookList}
      <Box sx={{ marginTop: "5px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.primary.light }}
          onClick={() => {
            setAdding(false);
          }}
        >
          Add a new book
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>{pagination}</Box>
      <Box sx={{ marginTop: "5px" }}>
        <CreateBookView postBook={postBook} errorSaving={errorSaving} />
      </Box>
    </Box>
  );
}

export default BookListView;
