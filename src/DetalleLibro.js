import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DetalleLibro() {
    const { id } = useParams();

    const [datosLibro, setDatosLibro] = useState("");
    const [error, setError] = useState(undefined);

    useEffect(() => {
        fetch(`http://localhost:3500/books/${id}`)
            .then(response => response.json())
            .catch(e => setError("Book not found"))
            .then((datosLibro) => {
                console.log(datosLibro);
                setDatosLibro(datosLibro);
            })
    }, [])

    return (
        error ? <p>{error}</p> :
            <>
                <h2><u>Datos del libro:</u></h2>
                <p><u><b>Nombre del libro:</b></u> {datosLibro.title}</p>
                <p><u><b>Numeros de paginas:</b></u> {datosLibro.numberOfPages}</p>
                <p><u><b>Autor:</b></u> {datosLibro.authorId}</p>
            </>
    )
}

export default DetalleLibro;