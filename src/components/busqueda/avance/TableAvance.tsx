import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DataAvanceEmpleado } from "@/interface/AvanceTimbrado";
import DetailsButtonEmp from "../empleados/DetailsButtonEmp";
import Icon from "@mdi/react";
import { mdiMicrosoftExcel } from "@mdi/js";
import { rowsEmpleadoToExcel } from "@/services/archivos/Archivos";

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "nombre", headerName: "Nombre", width: 250 },
  { field: "rfc", headerName: "RFC", width: 150 },
  { field: "numEmpleado", headerName: "No. Emp.", width: 70 },
  { field: "nombreArchivo", headerName: "Archivo", width: 250 },
  { field: "nombreCarpeta", headerName: "Carpeta", width: 130 },
  { field: "uuidTimbrado", headerName: "UUID", width: 300 },
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

export default function DetalleAvance({
  open,
  rows,
  handleCloseDialog,
}: {
  open: boolean;
  rows: DataAvanceEmpleado[];
  handleCloseDialog: (isOpen: boolean) => void;
}) {
  /*   
    useEffect Tiene un retraso y puede marcar errores
    usar solo cuando es 100% fijo

    // Ejemplo
    useEffect(() => {
      getRowsDetalles(fetchDetallesAvance(props.tipoDetalle, props.carpeta));
      console.log(props.tipoDetalle, props.carpeta);
    }, [props.tipoDetalle, props.carpeta]); 
  */

  return (
    <Dialog open={open} onClose={() => handleCloseDialog(false)} maxWidth="xl">
      <DialogTitle sx={{ display: "flex" }}>
        <Grid container>
          <Grid item xs={10}>
            <div>INFORMACIÓN DEL PROCESO</div>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              Detalles del timbrado
            </Typography>
          </Grid>
          <Grid item xs={2}  sx={{ display: "flex", justifyContent: "right" }}>
              <IconButton
                size="small"
                color="success"
                onClick={() => {
                  rowsEmpleadoToExcel(rows);
                }}
              >
                <Icon path={mdiMicrosoftExcel} size={2} />
              </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider></Divider>
      <DialogContent>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 25, 50, 100]}
            checkboxSelection
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
