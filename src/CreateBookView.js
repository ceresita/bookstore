import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";

function CreateBookView() {
  const [book, setBook] = useState({});
  const [authors, setAuthors] = useState([]);
  const { handleSubmit, reset, control } = useForm();

  useEffect(() => {
    fetch(`http://localhost:3500/authors/`)
      .then((response) => response.json())
      .then((a) => {
        if (a[0]) {
          setBook({ ...book, authorId: a[0].id });
        }
        setAuthors(a);
      });
  }, []);

  function saveAuthorId(event) {
    const newAuthorId = {
      ...book,
      authorId: authors[event.target.selectedIndex].id,
    };
    setBook(newAuthorId);
  }

  function postBook(book) {
    fetch("http://localhost:3500/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(() =>
        alert("Congratulations. Your book has been succesfully created")
      )
      .catch((e) => {
        alert("La re cagaste pa");
      });
  }

  return (
    <form onSubmit={handleSubmit(postBook)}>
      <Typography variant="h5">Book:</Typography>
      <Controller
        name="title"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            defaultValue={""}
            label="Title"
            error={error !== undefined}
            helperText={error ? "Este campo es requerido" : ""}
          />
        )}
      />
      <Controller
        name="numberOfPages"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            defaultValue={""}
            label="Number of pages"
            error={error !== undefined}
            helperText={error ? "Este campo es requerido" : ""}
          />
        )}
      />
      <br />
      <label htmlFor="authors">
        <u>
          <b>Select author:</b>
        </u>{" "}
      </label>
      <select name="authors" id="authors" onChange={saveAuthorId}>
        {authors.map((author) => (
          <option value={authors.id} key={author.name}>
            {author.name}
          </option>
        ))}
      </select>
      <br />
      <Button type="submit" variant="contained">
        Save
      </Button>
      <Button
        onClick={() => reset({ title: "", nofpages: "" })}
        variant={"outlined"}
      >
        Reset
      </Button>
      <br />
      <br />
      <Link to="/">Homepage</Link>
    </form>
  );
}

export default CreateBookView;
