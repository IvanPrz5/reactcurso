import { CalendarMonth } from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TablaNomina from "./nominas/TablaNomina";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { SetStateAction, useState } from "react";
import { Nomina } from "@/interface/Nominas";
import { fetchBuscaEmpleado, getNominas } from "@/services/busqueda/Busqueda";
import { Inputs, InputsEmpleado } from "@/interface/Busqueda";
import FormEmpleado from "./empleados/FormEmpleado";
import { EmpleadosData } from "@/interface/Empleado";
import TablaEmpleados from "./empleados/TablaEmpleados";

const menu = [
  { tipo: "Fechas de Inicio", num: "1" },
  { tipo: "Fechas de Fin", num: "2" },
  { tipo: "Fechas de Pago", num: "3" },
  { tipo: "Fechas de Envio", num: "4" },
  { tipo: "Nombre de Carga", num: "5" },
];

const menuFilter = ["Nombre", "RFC", "Tipo de Jornada"];

export default function Busqueda() {
  const [rows, setRows] = useState<Nomina[]>([]);
  const [skeleton, setSkeleton] = useState(Boolean);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [dataFilter, setDataFilter] = useState<InputsEmpleado>(Object);
  const [rowsEmpleados, setRowsEmpleados] = useState<EmpleadosData[]>([]);
  const [item, setItem] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const handleOpen = () => {
    setOpen(true);
  };

  const changeRowsNomina = (array: SetStateAction<Nomina[]>) => {
    setRows(array);
  };

  const changeRowsEmpleado = (array: SetStateAction<EmpleadosData[]>) => {
    setRowsEmpleados(array);
  };

  const changeStateSkeleton = (show: boolean) => {
    setSkeleton(show);
  };

  const changeStateFilter = (status: boolean) => {
    setFilter(status);
  };

  const getPropsEmpleado = (data: InputsEmpleado) => {
    changeStateFilter(true);
    setDataFilter(data);
  };

  const handleChange = (event: SelectChangeEvent) => {
    changeStateFilter(false)
    changeRowsEmpleado([]);
    changeRowsNomina([]);
    setItem(event.target.value as string);
  };

  function getRowsNomina(promise: Promise<Nomina[]>) {
    promise
      .then((response) => {
        changeRowsNomina(response);
      })
      .catch((e) => {
        console.log("Fatal " + e);
      })
      .finally(() => {
        changeStateSkeleton(false);
      });
  }

  function getRowsEmpleado(promise: Promise<EmpleadosData[]>) {
    promise
      .then((response) => {
        changeRowsEmpleado(response);
      })
      .catch((e) => {
        console.log("Fatal " + e);
      })
      .finally(() => {
        changeStateSkeleton(false);
      });
  }

  function buscarSubmit(data: Inputs) {
    changeStateSkeleton(true);
    if (!filter) {
      getRowsNomina(getNominas(data, item));
    } else {
      const fechas = { fechaInicio: data.fechaInicio, fechaFin: data.fechaFin };
      const copy = Object.assign(dataFilter, fechas);
      getRowsEmpleado(fetchBuscaEmpleado(copy));
    }
  }

  // Separar por componentes
  return (
    <div>
      <Card sx={{ minWidth: 200 }}>
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
              {item != "5" && (
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "right" }}
                >
                  {filter ? (
                    <Stack direction="row" spacing={1}>
                      <Chip
                        color="primary"
                        variant="outlined"
                        label={
                          menuFilter[Number(dataFilter.tipoBusqueda) - 1] +
                          ": " +
                          dataFilter.datoEmpleado
                        }
                        onClick={() => {
                          handleOpen();
                        }}
                        icon={<EditNoteIcon />}
                      />
                      <Chip
                        label="Reset"
                        color="error"
                        onClick={() => {
                          changeStateFilter(false);
                        }}
                        icon={<FilterAltOffIcon />}
                        variant="outlined"
                      />
                    </Stack>
                  ) : (
                    <Chip
                      label="Filtro Empleado"
                      color="success"
                      variant="outlined"
                      icon={<FilterAltIcon />}
                      onClick={() => {
                        handleOpen();
                      }}
                    ></Chip>
                  )}
                </Grid>
              )}
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
                      name="fechaInicio"
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
                                helperText: errors.fechaInicio?.message,
                                error: Boolean(errors.fechaInicio),
                              },
                            }}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Controller
                      name="fechaFin"
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
                                helperText: errors.fechaFin?.message,
                                error: Boolean(errors.fechaFin),
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
            {!filter ? (
              <TablaNomina array={rows?.length > 0 ? rows : []}></TablaNomina>
            ) : (
              <TablaEmpleados
                array={rowsEmpleados?.length > 0 ? rowsEmpleados : []}
              ></TablaEmpleados>
            )}
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

      <FormEmpleado
        open={open}
        handleCloseDialog={() => setOpen(false)}
        emitPropsEmpleado={getPropsEmpleado}
      ></FormEmpleado>
    </div>
  );
}
