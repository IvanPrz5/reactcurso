import { SubirNomina } from "@/interface/Nominas";
import { fetchListarNominas } from "@/services/archivos/ListarNominas";
import { CalendarMonth } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AsignarNominas from "./AsignarNominas";

export default function ListarNominas() {
  const [arrayNominas, setArrayNominas] = useState<SubirNomina[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ nombreCarga: string }>();

  function buscarNomina({nombreCarga}: {nombreCarga: string}){
    const listNomina = fetchListarNominas(nombreCarga);
    listNomina.then((response) => {
      setArrayNominas(response)
    })
    .catch((e) => {
      console.log("Fatal " + e)
    })
    .finally(() => {
      
    })
  }

  return (
    <div>
      <Card>
        <CardHeader
          avatar={<CalendarMonth />}
          title={<Typography>LISTA DE NÓMINAS</Typography>}
          subheader="Ingresa el nombre de carga para ver las nóminas disponibles"
        />
        <Divider></Divider>
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit(buscarNomina)}
            sx={{ minWidth: "100%" }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} lg={12}>
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
                lg={12}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button variant="contained" type="submit">LISTAR</Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      {arrayNominas.length > 0 && (
        <AsignarNominas array={arrayNominas}></AsignarNominas>
      )}
    </div>
  );
}
