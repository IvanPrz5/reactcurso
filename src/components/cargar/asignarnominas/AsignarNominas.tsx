import { SubirNomina } from "@/interface/Nominas";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FormNomina from "./FormNomina";
import { useState } from "react";
import { CalendarMonth } from "@mui/icons-material";

const Item = styled(Button)(() => ({
  height: 70,
  width: 170,
}));

export default function AsignarNominas({ array }: { array: SubirNomina[] }) {
  const [open, setOpen] = useState(false);
  const [nominaItem, setNominaItem] = useState<SubirNomina>(Object);

  const handleOpen = (item: SubirNomina) => {
    setOpen(true);
    setNominaItem(item)
  };

  return (
    <div>
      <Card sx={{ marginTop: 2 }}>
        <CardHeader
          avatar={<CalendarMonth />}
          title={<Typography>ASIGNAR NÓMINA</Typography>}
          subheader="Haz click en los recuadros de abajo para completar la información"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            {array.map((item, index) => (
              <Grid item key={index}>
                <Item variant="outlined" color="success" onClick={() => {handleOpen(item)}}>
                  {item.nombrecarpeta}
                </Item>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <FormNomina
        open={open}
        handleCloseDialog={() => setOpen(false)}
        nominaItem={nominaItem}
      ></FormNomina>
    </div>
  );
}
