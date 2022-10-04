import { Link } from "react-router-dom"

function App() {

    return (
        <>
        <h1>Welcome to my webpage!! =D</h1>
        <Link to="/books/create">Create book</Link><br/>
        <Link to="/authors/create">Create author</Link><br/>
        <Link to="/books">Booklist</Link>
        </>
    )
}

export default App;