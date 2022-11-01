import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

function AuthorsListView() {
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

  return authors.length > 0 ? (
    <>
      <Button
        variant="contained"
        component={Link}
        to="/authors/create"
        sx={{ backgroundColor: theme.palette.primary.light }}
      >
        Add a new author
      </Button>
      <List sx={{ maxWidth: "25%" }}>
        {authors.map((author) => (
          <ListItem
            secondaryAction={
              <IconButton onClick={() => deleteAuthor(author)} edge="end">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={author.name} />
          </ListItem>
        ))}
      </List>
    </>
  ) : (
    <>
      <Button variant="contained" component={Link} to="/authors/create">
        Add a new author
      </Button>
      <h4>There's no authors to show</h4>
    </>
  );
}

export default AuthorsListView;
