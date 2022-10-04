import Book from "./Book";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function BookListView() {
    const [books, setBooks] = useState([])
    const [bookId, setBookId] = useState([])

    function fetchData() {
        fetch(`http://localhost:3500/books/`)
            .then(response => response.json())
            .then((books) => {
                if (books[0]) {
                    setBookId(books[0].id)
                }

                setBooks(books);
            })
    }

    function saveBookId(event) {
        setBookId(books[event.target.selectedIndex].id);
    }

    function deleteBook() {
        fetch(`http://localhost:3500/books/${bookId}`, {
            method: "DELETE"
        })
            .then(() => fetchData())
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (        
        books.length > 0 ?
            <>
                <ul>{
                    books.map((book) => <Book title={book.title} id={book.id} />
                    )
                }</ul>

                <label htmlFor="books">Select book: </label>
                <select name="books" id="books" onChange={saveBookId}>{
                    books.map((book) => <option value={book.id} key={book.title}>{book.title}</option>
                    )}
                </select>
                <button onClick={deleteBook}>Delete</button><br /><br /> 
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