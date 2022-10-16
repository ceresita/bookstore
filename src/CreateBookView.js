import { MenuItem, Typography, TextField, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

function CreateBookView() {
  const [authors, setAuthors] = useState([]);
  const { handleSubmit, reset, control } = useForm();

  useEffect(() => {
    fetch(`http://localhost:3500/authors/`)
      .then((response) => response.json())
      .then((a) => {
        setAuthors(a);
      });
  }, []);

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
    <Box
      component="form" onSubmit={handleSubmit(postBook)}
      sx={{ display: "flex", flexDirection: "column", maxWidth: "35%" }}>
      <Typography variant="h6">Book:</Typography>
      <Controller
        name="title"
        control={control}
        defaultValue={""}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label="Title"
            error={error !== undefined}
            helperText={error ? "Este campo es requerido" : ""}
          />
        )}
      />
      <Controller
        name="numberOfPages"
        control={control}
        defaultValue={""}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            type="number"
            onChange={onChange}
            value={value}
            label="Number of pages"
            error={error !== undefined}
            helperText={error ? "Este campo es requerido" : ""}
          />
        )}
      />
      <Controller
        name="authorId"
        control={control}
        defaultValue={null}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            select
            label="Choose author:"
            onChange={onChange}
            value={value}
            error={error !== undefined}
            helperText={error ? "Este campo es requerido" : ""}>
            {authors.map((author) => (
              <MenuItem value={author.id} key={author.name}>
                {author.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="avatarUrl"
        control={control}
        defaultValue={""}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label="Avatar URL"
            error={error !== undefined}
            helperText={error ? "Este campo es requerido" : ""}
          />
        )}
      />
      <Box
        sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", margin: "5px" }}>
        <Button type="submit" variant="contained">
          Save
        </Button>
        <Button
          onClick={() => reset()}
          variant={"outlined"}
        >
          Reset
        </Button>
      </Box>
      <Link to="/">Homepage</Link>
    </Box>
  );
}

export default CreateBookView;
