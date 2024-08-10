import { Nomina } from "@/interface/Nominas";
import { mdiBell } from "@mdi/js";
import Icon from "@mdi/react";
import { NotificationImportant, Notifications } from "@mui/icons-material";
import { ButtonGroup, IconButton } from "@mui/material";
// import { GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";

function RenderDetailsButtons(params: GridRenderCellParams) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function timbrar(item: Nomina){
    handleOpen();
  }

  return (
    <>
      <ButtonGroup
        disableElevation
        variant="contained"
        aria-label="Disabled button group"
      >
        {/* <Button>
          <Notifications />
        </Button> */}
        <IconButton
          color="success"
          onClick={() => {
            
            timbrar(params.row)
          }}
        >
          <Notifications />
        </IconButton>
        <IconButton color="warning">
          <NotificationImportant />
        </IconButton>
      </ButtonGroup>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Icon path={mdiBell} size={1} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RenderDetailsButtons;
