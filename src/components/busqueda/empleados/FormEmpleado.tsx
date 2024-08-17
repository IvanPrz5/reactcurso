import { InputsEmpleado } from "@/interface/Busqueda";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const menu = [
  { tipo: "Nombre", num: "1" },
  { tipo: "RFC", num: "2" },
  { tipo: "Tipo de Jornada", num: "3" },
];

export default function FormEmpleado({
  open,
  handleCloseDialog,
  emitPropsEmpleado,
}: {
  open: boolean;
  handleCloseDialog: (isOpen: boolean) => void;
  emitPropsEmpleado: (data: InputsEmpleado) => void
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState,
    formState: { errors },
  } = useForm<InputsEmpleado>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  });

  const handleChangeInputsEmpleado = (data: InputsEmpleado) => {
    emitPropsEmpleado(data);
  }

  const aplicarFiltroEmpleado = (data: InputsEmpleado) => {
    handleCloseDialog(false);
    handleChangeInputsEmpleado(data);
  };

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ display: "flex" }}>
        <Grid container>
          <Grid item xs={11}>
            <div>APLICAR FILTRO EMPLEADO</div>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Busqueda de empleado(s) por tipo de fecha
            </Typography>
          </Grid>
          <Grid item xs={1} >
            <IconButton size="small" color="error" onClick={() => handleCloseDialog(false)}>
              <CloseIcon fontSize="inherit"></CloseIcon>
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider></Divider>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(aplicarFiltroEmpleado)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="tipoBusqueda"
                rules={{ required: "Requerido" }}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Tipo de Búsqueda</InputLabel>
                    <Select
                      defaultValue={""}
                      label="Tipo de Búsqueda"
                      onChange={(e) => {
                        field.onChange(e);
                        // handleChange(e);
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
                      {errors.tipoBusqueda?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              ></Controller>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Dato del Empleado"
                size="small"
                fullWidth
                {...register("datoEmpleado", { required: "Requerido" })}
                error={Boolean(errors.datoEmpleado)}
                helperText={errors.datoEmpleado?.message}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                type="submit"
                fullWidth
              >
                Aplicar Filtro
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
