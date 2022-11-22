import {
  MenuItem,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";

function CreateBookView(props) {
  const [authors, setAuthors] = useState([]);
  const { handleSubmit, reset, control } = useForm();
  const theme = useTheme();

  useEffect(() => {
    fetch(`http://localhost:3500/authors/`)
      .then((response) => response.json())
      .then((a) => {
        setAuthors(a);
      });
  }, []);

  const bookView = (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(props.postBook)}
        sx={{ display: "flex", flexDirection: "column", maxWidth: "35%" }}
      >
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
              label="Author"
              onChange={onChange}
              value={value}
              error={error !== undefined}
              helperText={error ? "Este campo es requerido" : ""}
            >
              {authors.map((author) => (
                <MenuItem value={author.id} key={author.name}>
                  {author.name}
                </MenuItem>
              ))}
            </TextField>
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
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: theme.palette.primary.light }}
          >
            Save
          </Button>
          <Button
            onClick={() => reset()}
            variant={"outlined"}
            sx={{ color: theme.palette.primary.light }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </>
  );

  return props.errorSaving == false ? (
    bookView
  ) : (
    <Box>
      {bookView}
      <Stack sx={{ width: "30%" }} spacing={2} marginTop="15px">
        <Alert variant="outlined" severity="error">
          An error has ocurred
        </Alert>
      </Stack>
    </Box>
  );
}

export default CreateBookView;
