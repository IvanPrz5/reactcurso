import GraficaMxnTimb from "@/components/graficas/GraficaMxnTimb";
import GraficaXml from "@/components/graficas/GraficaXml";
import { Box, Grid } from "@mui/material";

export default function Home() {
  return (
    <Box>
    <Grid container spacing={2}>
      <Grid item sm={12} lg={6}>
        <GraficaMxnTimb></GraficaMxnTimb>
      </Grid>
      <Grid item sm={12} lg={6}>
        <GraficaXml></GraficaXml>
      </Grid>
    </Grid>
    </Box>
  )
}
