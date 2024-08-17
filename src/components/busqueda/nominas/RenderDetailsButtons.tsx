import { Nomina } from "@/interface/Nominas";
import {
  fetchStatusTimbrado,
  fetchTimbrar,
} from "@/services/busqueda/Busqueda";
import { NotificationImportant, Notifications } from "@mui/icons-material";
import { ButtonGroup, IconButton } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import AvanceTimbrado from "../avance/AvanceTimbrado";
import AlertDialog from "../../alerts/AlertDialog";
import { mdiBell, mdiBellCheck } from "@mdi/js";
import { ConfigAlert } from "@/interface/AlertDialog";
import { CantXmlTimbrado } from "@/interface/AvanceTimbrado";
// import { CantXmlTimbrado } from "@/interface/AvanceTimbrado";

function RenderDetailsButtons(params: GridRenderCellParams) {
  // const algo: CantXmlTimbrado = new CantXmlTimbrado();
  const [open, setOpen] = useState(false);
  const [openDialogCarpet, setOpenDialogCarpet] = useState(false);
  const [avance, setAvance] = useState<CantXmlTimbrado>(Object);

  // se declara con estado inicial
  const [config, setConfig] = useState<ConfigAlert>({
    icon: mdiBell,
    color: "#357a38",
    title: "PROCESO DE TIMBRADO EMPEZADO",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  }

  const handleOpenDialogCarpet = () => {
    setOpenDialogCarpet(true);
  };

  const timbrarSubmit: SubmitHandler<Nomina> = (data) => {
    const timbrar = fetchTimbrar(data, false);
    timbrar
      .then((response) => {
        if (response != "PROCESO DE TIMBRADO EMPEZADO") {
          // Se cambia el estado inicial
          setConfig({
            icon: mdiBellCheck,
            color: "#ff9800",
            title: "LA CARPETA YA TIENE UN TIMBRADO",
          });
        }
      })
      .catch((e) => {
        console.log("Fatal " + e);
      })
      .finally(() => {
        handleOpen();
        setTimeout(() => {
          handleClose();
        }, 2500);
      });
  };

  const statusTimbradoSubmit: SubmitHandler<Nomina> = (item) => {
    const promise: Promise<CantXmlTimbrado> = fetchStatusTimbrado(item.carpeta);
    promise
      .then((response) => {
        setAvance(response);
      })
      .catch((e) => {
        console.log("Fatal " + e);
      })
      .finally(() => {
        handleOpenDialogCarpet();
      });
  };

  // <> = <Reac.Fragment>
  return (
    <>
      <ButtonGroup
        disableElevation
        variant="contained"
        aria-label="Disabled button group"
      >
        <IconButton
          color="success"
          onClick={() => {
            timbrarSubmit(params.row);
          }}
        >
          <Notifications />
        </IconButton>
        <IconButton
          color="warning"
          onClick={() => {
            statusTimbradoSubmit(params.row);
          }}
        >
          <NotificationImportant />
        </IconButton>
      </ButtonGroup>
      <AlertDialog open={open} config={config}></AlertDialog>
      <AvanceTimbrado
        open={openDialogCarpet}
        avance={avance}
        handleCloseDialog={() => setOpenDialogCarpet(false)}
      ></AvanceTimbrado>
    </>
  );
}

export default RenderDetailsButtons;
