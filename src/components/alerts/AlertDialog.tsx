import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Icon from "@mdi/react";
import { ConfigAlert } from "@/interface/AlertDialog";

export default function AlertDialog({open, config}: { open: boolean; config: ConfigAlert}) {
  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Icon path={config.icon} size={5} color={config.color} />
        {config.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Haz click en el boton amarillo de la tabla para más detalles
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
