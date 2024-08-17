import { ResultCargaFile } from "@/interface/SubirArchivos";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const columns: GridColDef[] = [
  { field: "carpeta", headerName: "Carpeta", width: 200 },
  { field: "mesaje", headerName: "Mensaje", width: 350 },
  { field: "estatus", 
    headerName: "Estatus", 
    width: 70, 
    renderCell: (params) => {
      if(params.row?.estatus == 0) return <ErrorOutlineIcon color="error"></ErrorOutlineIcon>
      return <CheckCircleOutlineIcon color="success"></CheckCircleOutlineIcon>
    } 
  },
];

export default function TablaResultFiles({
  array,
}: {
  array: ResultCargaFile[];
}) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        autoHeight
        rows={array}
        getRowId={(row) => row.carpeta}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 25, 50, 100]}
      />
    </div>
  );
}
