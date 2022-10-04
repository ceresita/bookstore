import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CreateBookView() {
    const [book, setBook] = useState({});
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3500/authors/`)
            .then(response => response.json())
            .then((a) => {
                if (a[0]) {
                    setBook({ ...book, authorId: a[0].id })
                }
                setAuthors(a)
            })
    }, [])


    function saveName(event) {
        const newName = { ...book, title: event.target.value }
        setBook(newName)
    }

    function saveNumberOfPages(event) {
        const newNumberOfPages = { ...book, numberOfPages: event.target.value }
        setBook(newNumberOfPages)
    }

    function saveAuthorId(event) {
        const newAuthorId = { ...book, authorId: authors[event.target.selectedIndex].id }
        setBook(newAuthorId)
    }

    function postBook() {
        fetch("http://localhost:3500/books", {
            method: "POST",
            body: JSON.stringify(book),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(() => alert("Congratulations. Your book has been succesfully created"))
            .catch((e) => {
                alert("La re cagaste pa");
            })
    }

    return (
        <>
            <h2><u>Book:</u></h2>
            <p><u><b>Name:</b></u> <input onChange={saveName}></input></p>
            <p><u><b>Number of pages:</b></u> <input onChange={saveNumberOfPages}></input></p>
            <label htmlFor="authors"><u><b>Select author:</b></u> </label>
            <select name="authors" id="authors" onChange={saveAuthorId}>{
                authors.map((author) => <option value={authors.id} key={author.name}>{author.name}</option>
                )}

            </select>
            <button onClick={postBook}>Save</button><br /><br />
            <Link to="/">Homepage</Link>
        </>
    )
}

export default CreateBookView;

// POST http://localhost:3500/books -> agrega un libro
// body: {
//  title: 'blabla',
//  numberOfPages: 320,
//  authorId: 1
//}
//}