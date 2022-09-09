import { useState, useEffect} from "react";

function DetalleLibro() {

    const [datosLibro, setDatosLibro] = useState("");

    useEffect(() => {
        fetch("http://localhost:3500/book")
            .then(x => x.json())
            .then((datosLibro) => {
                setDatosLibro(datosLibro)
            }
            )
    }
    )
    return (
        <>
            <h2><u>Datos del libro:</u></h2>
            <p><u><b>Nombre del libro:</b></u> {datosLibro.nombre}</p>
            <p><u><b>Numeros de paginas:</b></u> {datosLibro.nroPags}</p>
            <p><u><b>Autor:</b></u> {datosLibro.autor}</p>
        </>
    )
}

export default DetalleLibro;