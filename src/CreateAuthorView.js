import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";

function CreateAuthorView() {
  const { handleSubmit, reset, control } = useForm();

  function postAuthor(author) {
    fetch("http://localhost:3500/authors", {
      method: "POST",
      body: JSON.stringify(author),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(() =>
        alert("Congratulations. Your author has been succesfully created")
      )
      .catch((e) => {
        alert("La re cagaste pa");
      });
  }

  return (
    <form onSubmit={handleSubmit(postAuthor)}>
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            defaultValue={""}
            label="Name"
            error={error !== undefined}
            helperText={error ? "Este campo es requerido" : ""}
          />
        )}
      />
      <br />
      <Button type="submit" variant="contained">
        Create
      </Button>
      <Button onClick={() => reset({ name: "" })} variant={"outlined"}>
        Reset
      </Button>
      <br />
      <br />
      <Link to="/">Homepage</Link>
    </form>
  );
}

export default CreateAuthorView;
