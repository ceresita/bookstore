import { useState } from "react";
import { Link } from "react-router-dom";

function CreateAuthorView() {

    const [author, setAuthor] = useState({name:""});


    function saveAuthorName(event) {
        const newAuthor = { ...author, name: event.target.value }
        setAuthor(newAuthor)
    }

    function postAuthor() {
        fetch("http://localhost:3500/authors", {
            method: "POST",
            body: JSON.stringify(author),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(() => alert("Congratulations. Your author has been succesfully created"))
            .catch((e) => {
                alert("La re cagaste pa");
            })
    }

    const isCreateDisabled = author.name.length == 0



    return (
        <>
            <p><u><b>Author Name:</b></u> <input onChange={saveAuthorName} /></p><br />
            <button onClick={postAuthor} disabled={isCreateDisabled}>Create</button><br />
            <Link to="/">Homepage</Link>
        </>
    )
}

export default CreateAuthorView;

/* trata de hacer una pantalla que te deje dar de alta autores
y otra que te deje ver un autor por su id
(parecido a como hicimos con los libros)
hacelo sin hacer la parte de la api, osea todavia no hagas los fetch, mete datos random hardcodeados nomas
feel free to copy lo que ya hicimos en los otros componentes
y ver si lo podes adaptar
yo diria que por ahora lo unico interesante del autor es su nombre, despues vemos qué le agregamos */