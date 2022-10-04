import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AuthorView() {
    const { id } = useParams();

    const [author, setAuthor] = useState({});
    const [error, setError] = useState(undefined);

    useEffect(() => {
        fetch(`http://localhost:3500/authors/${id}`)
            .then(response => response.json())
            .catch(e => setError("Author not found"))
            .then((author) => {
                setAuthor(author);
            })
    }, [])

    return (
        error ? <p>{error}</p> :
            <>
                <p>Author's name: {author.name}</p>
            </>
    )
}

export default AuthorView;