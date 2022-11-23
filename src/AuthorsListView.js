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
import CreateAuthorView from "./CreateAuthorView";
import TablePagination from "@mui/material/TablePagination";

function AuthorsListView() {
  const [authors, setAuthors] = useState([]);
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

  function postAuthor(author) {
    fetch("http://localhost:3500/authors", {
      method: "POST",
      body: JSON.stringify(author),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .catch(() => {
        setErrorSaving(true);
      })
      .then(() => fetchData());
  }

  const authorsInPage = authors.slice(
    page * rowsPerPage,
    rowsPerPage * (page + 1)
  );
  const authorsList = (
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
            {authorsInPage.length == 0 ? (
              <StyledTableRow key="empty">
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            ) : (
              authorsInPage.map((author) => (
                <StyledTableRow key={author.id}>
                  <StyledTableCell>{author.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton onClick={() => deleteAuthor(author)} edge="end">
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
      count={authors.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5, 10]}
    />
  );

  return adding == false ? (
    <Box>
      {authorsList}
      <Box sx={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.primary.light }}
          onClick={() => {
            setAdding(true);
          }}
        >
          Add a new author
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>{pagination}</Box>
    </Box>
  ) : (
    <Box>
      {authorsList}
      <Box sx={{ marginTop: "5px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.primary.light }}
          onClick={() => {
            setAdding(false);
          }}
        >
          Add a new author
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>{pagination}</Box>
      <Box sx={{ marginTop: "5px" }}>
        <CreateAuthorView postAuthor={postAuthor} errorSaving={errorSaving} />
      </Box>
    </Box>
  );
}

export default AuthorsListView;
