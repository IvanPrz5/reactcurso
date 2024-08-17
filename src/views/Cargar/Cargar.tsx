import ListarNominas from '@/components/cargar/asignarnominas/ListarNominas'
import SubirArchivos from '@/components/cargar/subirarchivos/SubirArchivos'
import { Box, Grid } from '@mui/material'

export default function Cargar() {
  return (
    <Box>
      <Grid container spacing={1}>
      <Grid item sm={12}>
        <SubirArchivos></SubirArchivos>
      </Grid>
      <Grid item sm={12}>
        <ListarNominas></ListarNominas>
      </Grid>
    </Grid>
    </Box>
  )
}
