import {
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { EmpleadosData } from "@/interface/Empleado";
import DetailsButtonEmp from "./DetailsButtonEmp";
import Icon from "@mdi/react";
import { mdiMicrosoftExcel } from '@mdi/js';
import { rowsEmpleadoToExcel } from "@/services/archivos/Archivos";

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
  { field: "id", headerName: "ID", width: 80 },
  { field: "nombre", headerName: "Nombre", width: 200 },
  { field: "numEmpleado", headerName: "No. Emp.", width: 80 },
  { field: "rfc", headerName: "Rfc", width: 140 },
  { field: "total", headerName: "Total", width: 100 },
  { field: "fechaPago", headerName: "Fecha de Pago", width: 120 },

  {
    field: "actions",
    headerName: "Actions",
    renderCell: (params) => {
      if(params.row?.uuidTimbrado.length == 36){
        return <DetailsButtonEmp params={params}></DetailsButtonEmp>;
      }
    },
    width: 130,
  },
];

export default function TablaEmpleados({ array }: { array: EmpleadosData[] }) {
  return (
    <>
      <Toolbar>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="div">
              Lista de Empleados
            </Typography>
          </Grid>
          <Grid item xs={6}  sx={{ display: "flex", justifyContent: "right" }}>
            {array.length > 0 && (
              <IconButton
              size="small"
              color="success"
                onClick={() => {
                  rowsEmpleadoToExcel(array);
                }}
              >
                <Icon path={mdiMicrosoftExcel} size={2} />
              </IconButton>
            )}
          </Grid>
        </Grid>
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
