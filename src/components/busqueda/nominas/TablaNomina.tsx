import { Nomina } from "@/interface/Nominas";
import {
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import RenderDetailsButtons from "./RenderDetailsButtons";

function CustomNoRowsOverlay() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div>Sin Información</div>
    </Box>
  );
}

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "año", headerName: "Año", width: 70 },
  { field: "mesLetra", headerName: "Mes", width: 80 },
  { field: "fechaInicio", headerName: "Inicio Periodo" },
  { field: "fechaFin", headerName: "Fin Periodo" },
  { field: "fechaPago", headerName: "Fecha Pago" },
  { field: "totalEmpledos", headerName: "No. Empleados", width: 70 },
  // { field: "no", headerName: "No" },
  { field: "neto", headerName: "Neto" },
  { field: "totalIsr", headerName: "ISR" },
  // { field: "descripcion", headerName: "Nomina" },
  { field: "fechaEnvio", headerName: "Fecha Envio" },
  { field: "carpeta", headerName: "Archivo", width: 130 },
  { field: "isrTimbrado", headerName: "ISR Timbrado" },
  { field: "isrNoTimbrado", headerName: "ISR No Timbrado" },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: RenderDetailsButtons,
    width: 130,
  },
];

export default function Tabla({ array }: {array: Nomina[]}) {
  return (
    <>
      <Toolbar>
        <Typography variant="h6" component="div">
          Lista de Nóminas
        </Typography>
      </Toolbar>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          autoHeight
          rows={array}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 25, 50, 100]}
          checkboxSelection
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      </div>
    </>
  );
}
