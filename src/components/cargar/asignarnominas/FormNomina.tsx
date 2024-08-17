import { SubirNomina } from "@/interface/Nominas";
import { monthNames } from "@/utils/Meses";
import { CheckBox } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function FormNomina({
  open,
  handleCloseDialog,
  nominaItem,
}: {
  open: boolean;
  handleCloseDialog: (isOpen: boolean) => void;
  nominaItem: SubirNomina;
}) {
  return (
    <Dialog
      open={open}
      onClose={() => handleCloseDialog(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ display: "flex" }}>
        <Grid container>
          <Grid item xs={11}>
            <div>ENVIAR DATOS</div>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              Ingresa los datos faltantes y presiona el boton
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider></Divider>
      <DialogContent>
        <Box component="form" sx={{ minWidth: "100%" }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} lg={2}>
              <Autocomplete
                disablePortal
                size="small"
                fullWidth
                options={[
                  "2018",
                  "2019",
                  "2020",
                  "2021",
                  "2022",
                  "2023",
                  "2024",
                ]}
                renderInput={(params) => <TextField {...params} label="Año" />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <Autocomplete
                fullWidth
                size="small"
                options={monthNames}
                renderInput={(params) => <TextField {...params} label="Mes" />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <TextField label="No." size="small" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <TextField label="Nómina" size="small" fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={3} lg={2}>
              <TextField
                label="Inicio de Periodo"
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <TextField
                label="Fin de Periodo"
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <TextField
                label="Fecha de Pago"
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <TextField
                label="Empleados"
                size="small"
                fullWidth

                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <TextField
                label="Percepciones"
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <TextField
                label="Deducciones"
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Grid>

            <Grid item xs={12} sm={3} lg={2}>
              <TextField
                label="Neto"
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <TextField
                label="Otros Pagos"
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <TextField
                label="Documento Contable"
                size="small"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} lg={2}>
              <TextField
                label="No. Ejecución"
                size="small"
                fullWidth
              ></TextField>
            </Grid>

            <Grid item xs={12} sm={4} lg={2}>
              <TextField
                label="ISR"
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={4} lg={2}>
              <TextField
                label="Fecha de Envio"
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField
                label="Archivo"
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} lg={5}>
              <FormControlLabel control={<Checkbox />} label="Sin Relación" />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <Divider></Divider>
      <DialogActions>
        <Button variant="contained" color="success">
          Enviar Datos
        </Button>
      </DialogActions>
    </Dialog>
  );
}
