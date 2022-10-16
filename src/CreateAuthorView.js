import { Controller, useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";

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
    <Box
      component="form"
      onSubmit={handleSubmit(postAuthor)}
      sx={{ display: "flex", flexDirection: "column", maxWidth: "15%" }}
    >
      <Typography variant="h6">Author:</Typography>
      <Controller
        name="name"
        control={control}
        defaultValue={""}
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: "5px",
        }}
      >
        <Button type="submit" variant="contained">
          Create
        </Button>
        <Button onClick={() => reset({ name: "" })} variant={"outlined"}>
          Reset
        </Button>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
      ></Box>
    </Box>
  );
}

export default CreateAuthorView;
