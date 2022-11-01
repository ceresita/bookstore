import { Controller, useForm } from "react-hook-form";
import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, Stack } from "@mui/material";

function CreateAuthorView() {
  const { handleSubmit, reset, control } = useForm();
  const [savedSuccesfully, setSavedSuccesfully] = useState(false);

  function postAuthor(author) {
    fetch("http://localhost:3500/authors", {
      method: "POST",
      body: JSON.stringify(author),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(() => {
        setSavedSuccesfully(true)
      });
  }

  const authorView = <>
    <Box
      component="form"
      onSubmit={handleSubmit(postAuthor)}
      sx={{ display: "flex", flexDirection: "column", maxWidth: "27%" }}
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
            sx={{ maxWidth: "75%" }}
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
          marginRight: "88px",
        }}
      >
        <Button type="submit" variant="contained">
          Create
        </Button>
        <Button onClick={() => reset({ name: "" })} variant={"outlined"}>
          Reset
        </Button>
      </Box>
    </Box>
  </>

  return savedSuccesfully == false ? (
    authorView
  ) : (
    <Box>
      {authorView}
      <Stack sx={{ width: '30%' }} spacing={2} marginTop="15px">
        <Alert variant="outlined" severity="success">Your author has been succesfully created</Alert>
      </Stack>
    </Box>
  );
}

export default CreateAuthorView;
