import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { List, ListItem, IconButton, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function BookListView() {
    const [books, setBooks] = useState([])

    function fetchData() {
        fetch(`http://localhost:3500/books/`)
            .then(response => response.json())
            .then((books) => {
                setBooks(books);
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    function deleteBook(book) {
        fetch(`http://localhost:3500/books/${book.id}`, {
      method: "DELETE"
    })
    .then (() => fetchData())
    }


    return (
        books.length > 0 ?
            <>
                <List
                    sx={{ maxWidth: "25%" }}>{
                        books.map((book) =>
                            <ListItem
                                secondaryAction={
                                    <IconButton onClick={() => deleteBook(book)} edge="end">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar src={book.avatarUrl} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={book.title}
                                />
                            </ListItem>
                        )}
                </List>

                <Link to="/">Homepage</Link>

            </>
            :
            <>
                <p>Sry pa, no hay libros</p><br />
                <Link to="/">Homepage</Link>
            </>

    )
}
export default BookListView;