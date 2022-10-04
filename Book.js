import { Link } from "react-router-dom";

function Book (props) {

    return (
        <li><Link to={`/books/${props.id}`}>{props.title}</Link></li>      
    )
}

export default Book;