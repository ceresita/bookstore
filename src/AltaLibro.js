import { useState } from "react";

function AltaLibro() {
    const [datosDelLibro, setDatosDelLibro] = useState({});

    function guardarTextoNombre(event) {
        const nuevosDatos = {...datosDelLibro, nombre: event.target.value}
        setDatosDelLibro(nuevosDatos)
    }

    function guardarTextoNroPags(event) {
        const nuevosDatos = {...datosDelLibro, nroPags: event.target.value}
        setDatosDelLibro(nuevosDatos)
    }

    function guardarTextoAutor(event) {
        const nuevosDatos = {...datosDelLibro, autor: event.target.value}
        setDatosDelLibro(nuevosDatos)
    }

    function guardarDatosLibro() {
        fetch("http://localhost:3500/book", {
            method: "POST",
            body: JSON.stringify(datosDelLibro),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(x => x.json())
        .then(() => alert("Enhorabuena, tu libro ha sido guardado con éxito!"))
        .catch(() => alert("La re cagaste pa"))
    }

    return (
        <>
            <h2><u>Datos del libro:</u></h2>
            <p><u><b>Nombre del libro:</b></u> <input onChange={guardarTextoNombre}></input></p>
            <p><u><b>Numeros de paginas:</b></u> <input onChange={guardarTextoNroPags}></input></p>
            <p><u><b>Autor:</b></u> <input onChange={guardarTextoAutor}></input></p>
            <button onClick={guardarDatosLibro}>Guardar</button>
        </>
    )
}

export default AltaLibro;