import {
  Button,
  DialogActions,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import {
  CantXmlTimbrado,
  DataAvanceEmpleado,
} from "@/interface/AvanceTimbrado";
import DetalleAvance from "./TableAvance";
import { useState } from "react";
import { fetchDetallesAvance } from "@/services/busqueda/Busqueda";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));

const ItemFecha = styled(DialogContentText)(({ theme }) => ({
  textAlign: "right",
  padding: theme.spacing(1),
  fontSize: 13,
}));

function CircularProgressWithLabel(
  props: CircularProgressProps & {
    value: number;
    cantidad: number;
    color: string;
  }
) {
  return (
    <Box
      sx={{ position: "relative", display: "inline-flex", cursor: "pointer" }}
    >
      <CircularProgress
        size={100}
        thickness={7}
        variant="determinate"
        {...props}
        color={props.color}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: 18 }}
        >
          {props.cantidad}
        </Typography>
      </Box>
    </Box>
  );
}

export default function AvanceTimbrado({
  open,
  avance,
  handleCloseDialog,
}: {
  open: boolean;
  avance: CantXmlTimbrado;
  handleCloseDialog: (isOpen: boolean) => void;
}) {
  const [openDetalle, setOpenDetalle] = useState(false);
  const [rows, setRows] = useState<DataAvanceEmpleado[]>([]);

  const handleOpenDetalle = () => {
    setOpenDetalle(true);
  };

  function getRowsDetalles(promise: Promise<DataAvanceEmpleado[]>) {
    promise
      .then((response) => {
        setRows(response);
      })
      .catch((e) => {
        console.log("Fatal " + e);
      })
      .finally(() => {
        handleOpenDetalle();
      });
  }

  function submitRowsDetalles(tipoDetalle: number, carpeta: string) {
    getRowsDetalles(fetchDetallesAvance(tipoDetalle, carpeta));
  }

  return (
    <>
      <Dialog open={open} fullWidth>
        <DialogTitle sx={{ display: "flex" }}>
          <Grid container>
            <Grid item>
              <div>ESTATUS DEL TIMBRADO</div>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Información sobre el proceso de timbrado
              </Typography>
            </Grid>
          </Grid>
          <IconButton onClick={() => handleCloseDialog(false)}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </DialogTitle>
        <Divider></Divider>
        <DialogContent sx={{ flexGrow: 1 }}>
          <Typography
            sx={{
              fontSize: 14,
              marginBottom: 3,
              display: "flex",
              justifyContent: "center",
            }}
            color="text.secondary"
          >
            Carpeta: {avance.carpeta}
          </Typography>
          <Grid container>
            <Grid item xs={12} md={4}>
              <Item
                onClick={() => {
                  submitRowsDetalles(0, avance.carpeta);
                }}
              >
                <CircularProgressWithLabel
                  value={(avance.cantidadXml * 100) / avance.cantidadXml}
                  cantidad={avance.cantidadXml}
                  color="primary"
                />
                <DialogContentText sx={{ fontSize: 13 }}>
                  Total de Xml
                </DialogContentText>
              </Item>
            </Grid>
            <Grid item xs={12} md={4}>
              <Item
                onClick={() => {
                  submitRowsDetalles(1, avance.carpeta);
                }}
              >
                <CircularProgressWithLabel
                  value={Math.ceil(
                    (avance.cantidadExito * 100) / avance.cantidadXml
                  )}
                  cantidad={avance.cantidadExito}
                  color="success"
                />
                <DialogContentText sx={{ fontSize: 13 }}>
                  Xml Timbrados
                </DialogContentText>
              </Item>
            </Grid>
            <Grid item xs={12} md={4}>
              <Item
                onClick={() => {
                  submitRowsDetalles(2, avance.carpeta);
                }}
              >
                <CircularProgressWithLabel
                  value={Math.ceil(
                    (avance.cantidadError * 100) / avance.cantidadXml
                  )}
                  cantidad={avance.cantidadError}
                  color="error"
                />
                <DialogContentText sx={{ fontSize: 13 }}>
                  Xml Con Errores
                </DialogContentText>
              </Item>
            </Grid>
          </Grid>
          <Divider></Divider>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <ItemFecha>Inicio : {avance.inicioTimbrado}</ItemFecha>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemFecha>Fin : {avance.finTimbrado}</ItemFecha>
            </Grid>
          </Grid>
          <Divider></Divider>
        </DialogContent>
        <DialogActions sx={{ paddingTop: 0 }}>
          <Button variant="contained" color="warning" fullWidth>
            FORZAR CANCELACIÓN
          </Button>
        </DialogActions>
      </Dialog>
      <DetalleAvance
        open={openDetalle}
        rows={rows}
        handleCloseDialog={() => setOpenDetalle(false)}
      ></DetalleAvance>
    </>
  );
}
