import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function BookView() {
    const { id } = useParams();

    const [book, setBook] = useState("");
    const [error, setError] = useState(undefined);

    useEffect(() => {
        fetch(`http://localhost:3500/books/${id}`)
            .then(response => response.json())
            .catch(e => setError("Book not found"))
            .then((book) => {
                setBook(book);
            })
    }, [])

    return (
        error ? <p>{error}</p> :
            <>
                <h2><u>Book data:</u></h2>
                <p><u><b>Title:</b></u> {book.title}</p>
                <p><u><b>Number of Pages:</b></u> {book.numberOfPages}</p>
                <p><u><b>Author:</b></u> {book.authorName}</p><br/>
                <Link to="/">Homepage</Link>
            </>
    )
}

export default BookView;

// GET http://localhost:3500/books/${id} -> dame el libro con este id
// GET http://localhost:3500/books -> dame todos los libros