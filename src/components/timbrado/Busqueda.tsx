import { CalendarMonth } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Tabla from "./Tabla";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { SetStateAction, useState } from "react";
import { Nomina } from "@/interface/Nominas";
import { getNominas } from "@/services/timbrado/Timbrado";
import { Inputs } from "@/interface/Busqueda";

const menu = [
  { tipo: "Fechas de Inicio", num: "1" },
  { tipo: "Fechas de Fin", num: "2" },
  { tipo: "Fechas de Pago", num: "3" },
  { tipo: "Fechas de Envio", num: "4" },
  { tipo: "Nombre de Carga", num: "5" },
];

export default function Busqueda() {
  const [item, setItem] = useState("");
  const [rows, setRows] = useState<Nomina[]>([]);
  const [skeleton, setSkeleton] = useState(Boolean);

  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value as string);
  };

  const changeStateRows = (array: SetStateAction<Nomina[]>) => {
    setRows(array);
  };

  const changeStateSkeleton = (show: boolean) => {
    setSkeleton(show);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  
  function getRowsData(promise: Promise<Nomina[]>){
    promise.then((response) => {
      changeStateRows(response);
    })
    .catch((e) => {
      console.log("Fatal " + e);
    }).finally(() => {
      changeStateSkeleton(false);
    });
  }
  
  const buscarSubmit: SubmitHandler<Inputs> = (data) => {
    changeStateSkeleton(true);
    getRowsData(getNominas(data, item))
  };

  return (
    <div>
      <Card sx={{ minWidth: 300 }}>
        <CardHeader
          avatar={<CalendarMonth />}
          title={<Typography>BUSQUEDA POR FECHAS</Typography>}
          subheader="Selecciona el tipo de búsqueda e ingresa las fechas"
        />
        <Divider></Divider>
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit(buscarSubmit)}
            sx={{ minWidth: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Controller
                  name="tipoBusqueda"
                  rules={{ required: "Requerido" }}
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <InputLabel>Tipo de Búsqueda</InputLabel>
                      <Select
                        defaultValue={""}
                        label="Tipo de Busqueda"
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange(e);
                        }}
                        error={Boolean(errors.tipoBusqueda)}
                      >
                        {menu.map((item) => (
                          <MenuItem value={item.num} key={item.num}>
                            {item.tipo}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error>
                        {Boolean(errors.tipoBusqueda) == true
                          ? "Requerido"
                          : ""}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              {item != "5" ? (
                <>
                  <Grid item xs={12} md={4}>
                    <Controller
                      name="fechaUno"
                      rules={{ required: "Requerido" }}
                      control={control}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            defaultValue={null}
                            onChange={(date) => {
                              field.onChange(date);
                            }}
                            slotProps={{
                              textField: {
                                size: "small",
                                fullWidth: true,
                                helperText: errors.fechaUno?.message,
                                error: Boolean(errors.fechaUno),
                              },
                            }}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Controller
                      name="fechaDos"
                      rules={{ required: "Requerido" }}
                      control={control}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            defaultValue={null}
                            onChange={(date) => {
                              field.onChange(date);
                            }}
                            slotProps={{
                              textField: {
                                size: "small",
                                fullWidth: true,
                                helperText: errors.fechaDos?.message,
                                error: Boolean(errors.fechaDos),
                              },
                            }}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12} md={8}>
                  <TextField
                    label="Email"
                    size="small"
                    fullWidth
                    {...register("nombreCarga", { required: "Requerido" })}
                    error={Boolean(errors.nombreCarga)}
                    helperText={errors.nombreCarga?.message}
                  ></TextField>
                </Grid>
              )}
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button size="large" variant="contained" type="submit">
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      {skeleton == false ? (
        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <Tabla array={rows?.length > 0 ? rows : []}></Tabla>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ marginTop: 2 }}>
          <Skeleton
            sx={{ height: 50 }}
            animation="wave"
            variant="rectangular"
          />
          <Skeleton
            sx={{ height: 50, marginTop: 1 }}
            animation="wave"
            variant="rectangular"
          />
          <Skeleton
            sx={{ height: 300, marginTop: 1 }}
            animation="wave"
            variant="rectangular"
          />
        </Box>
      )}
    </div>
  );
}
