import { styled } from "@mui/material/styles";
import { CalendarMonth } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { InputsFiles, ResultCargaFile } from "@/interface/SubirArchivos";
import { fetchSubirArchivos } from "@/services/archivos/Archivos";
import TablaResultFiles from "./TablaResultFiles";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function SubirArchivos() {
  const [files, setFiles] = useState<File[]>([]);
  const [isTimbrado, setIsTimbrado] = useState("false");
  const [rowsFiles, setRowsFiles] = useState<ResultCargaFile[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputsFiles>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    setFiles(selectedFiles ? Array.from(selectedFiles) : []);
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTimbrado((event.target as HTMLInputElement).value);
  };

  const handleFileRemove = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };

  function subirArchivo(data: InputsFiles) {
    data.isTimbrado = isTimbrado;
    const buttonSubir = fetchSubirArchivos(data);
    buttonSubir
      .then((response) => {
        setRowsFiles(response);
      })
      .catch((e) => {
        console.log("Fatal " + e);
      })
      .finally(() => {
        setFiles([]);
        reset();
      });
  }

  return (
    <div>
      <Card sx={{ minWidth: 200 }}>
        <CardHeader
          avatar={<CalendarMonth />}
          title={<Typography>SUBE LOS ARCHIVOS</Typography>}
          subheader="Carga el archivo e ingresa el nombre de carga"
        />
        <Divider></Divider>
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit(subirArchivo)}
            sx={{ minWidth: "100%" }}
          >
            <Grid container spacing={2}>
              {files.length > 0 && (
                <Grid
                  item
                  md={12}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    listStyle: "none",
                  }}
                >
                  {files.map((file, index) => (
                    <ListItem key={index}>
                      <Chip
                        color="primary"
                        variant="outlined"
                        label={file.name}
                        onDelete={() => handleFileRemove(file)}
                      />
                    </ListItem>
                  ))}
                </Grid>
              )}
              <Grid
                item
                md={12}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <FormControl>
                  <RadioGroup
                    row
                    value={isTimbrado}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="false"
                      control={<Radio color="success" />}
                      label="No Timbrados"
                    />
                    <FormControlLabel
                      value="true"
                      control={<Radio color="success" />}
                      label="Timbrados"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="file"
                  size="small"
                  fullWidth
                  {...register("archivos", { required: "Requerido" })}
                  error={Boolean(errors.archivos)}
                  helperText={errors.archivos?.message}
                  onChange={handleFileChange}
                  inputProps={{
                    multiple: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nombre de Carga"
                  size="small"
                  fullWidth
                  {...register("nombreCarga", { required: "Requerido" })}
                  error={Boolean(errors.nombreCarga)}
                  helperText={errors.nombreCarga?.message}
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button size="large" variant="contained" type="submit">
                  Subir Archivos
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      {rowsFiles.length > 0 && (
        <Card sx={{ marginTop: 2, height: "200", overflow: "auto" }}>
          <TablaResultFiles array={rowsFiles}></TablaResultFiles>
          <CardActions sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setRowsFiles([]);
              }}
            >
              Limpiar Resultados
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}
