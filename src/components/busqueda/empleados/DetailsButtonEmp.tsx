import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { fetchDownFile } from "@/services/archivos/Archivos";
import { DataAvanceEmpleado } from "@/interface/AvanceTimbrado";

const options = [
  {
    cod: 1,
    tipoArchivo: "XML",
  },
  {
    cod: 2,
    tipoArchivo: "CBB",
  },
  {
    cod: 3,
    tipoArchivo: "PDF",
  },
];

const ITEM_HEIGHT = 30;

function DetailsButtonEmp({params}: {params: GridRenderCellParams}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function descargarArchivo(cod: number, item: DataAvanceEmpleado) {
    fetchDownFile(
      cod,
      item.uuidTimbrado,
      item.nombreCarpeta,
      item.nombreArchivo
    );
  }

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "10ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.cod}
            onClick={() => {
              descargarArchivo(option.cod, params.row);
            }}
          >
            {option.tipoArchivo}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default DetailsButtonEmp;
