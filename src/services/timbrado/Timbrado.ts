import axios from "axios";
import { API_URL } from "../config";
import FechaFormat from "@/utils/FechaFormat";
import { Nomina } from "@/interface/Nominas";
import { Inputs } from "@/interface/Busqueda";

export async function getNominas(data: Inputs, item: string) {
  const fechaFormat = new FechaFormat();

  const ruta = item != "5" ? "/fecha" : "/nombreCargaDto";
  const fechaInicio = fechaFormat.convert(new Date(data.fechaUno)).split("T");
  const fechaFin = fechaFormat.convert(new Date(data.fechaDos)).split("T");
  const formData = new FormData();

  if (ruta == "/fecha") {
    formData.append("fechaInicio", fechaInicio[0]);
    formData.append("fechaFin", fechaFin[0]);
    formData.append("tipoBusqueda", data.tipoBusqueda);
  } else {
    formData.append("nombreCarga", data.nombreCarga);
  }

  let desserts: Nomina[] = [];
  await axios.post(API_URL + "/nominas" + ruta, formData).then((response) => {
    desserts = response.data;
    for (let i = 0; i < response.data.length; i++) {
      desserts[i].mes = fechaFormat.getMes(desserts[i].mes);
      if (desserts[i].deducciones == null) {
        desserts[i].deducciones = 0.0;
      }
    }
  });
  return desserts;
}

export async function fetchTimbrar(item: Nomina, faltanteStatus: boolean){
  type config = {
    icon: string,
    color: string,
    title: string,
    subTitle: string,
  }

  const cardContent = (icon: string, color: string, title: string, subTitle: string) => {
    iconP: icon;
    color = color;
    title = title;
    subTitle = subTitle;
  }

  axios.post(API_URL + "/timbrado", null, {
    params: {
      carpeta: faltanteStatus ? item : item.carpeta,
      faltante: faltanteStatus
    }
  })
    .then((response) => {
      if (response.data == "PROCESO DE TIMBRADO EMPEZADO") {
        algo.color
        // emit("mostrarSnack", "mdi-bell-check", "success", response.data, "Haz click en el boton amarillo de la tabla para mas detalles");
      } else {
        // emit("mostrarSnack", "mdi-bell-alert", "warning", response.data, "Haz click en el boton amarillo de la tabla para mas detalles");
      }
      
    })
    .catch((e) => {
      console.log("Fatal " + e);
    })
}
