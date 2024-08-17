import axios from "axios";
import { API_URL } from "../config";
import FechaFormat from "@/utils/FechaFormat";
import { Nomina } from "@/interface/Nominas";
import { Inputs } from "@/interface/Busqueda";
import { BusquedaEmpleado, EmpleadosData } from "@/interface/Empleado";
import { DataAvanceEmpleado } from "@/interface/AvanceTimbrado";

export async function getNominas(data: Inputs, item: string) {
  const fechaFormat = new FechaFormat();

  const ruta = item != "5" ? "/fecha" : "/nombreCargaDto";
  const fechaInicio = fechaFormat
    .convert(new Date(data.fechaInicio))
    .split("T");
  const fechaFin = fechaFormat.convert(new Date(data.fechaFin)).split("T");
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
      desserts[i].mesLetra = fechaFormat.getMes(desserts[i].mes);
      if (desserts[i].deducciones == null) {
        desserts[i].deducciones = 0.0;
      }
    }
  });
  return desserts;
}

export async function fetchTimbrar(item: Nomina, faltanteStatus: boolean) {
  return await axios
    .post(API_URL + "/timbrado", null, {
      params: {
        carpeta: faltanteStatus ? item : item.carpeta,
        faltante: faltanteStatus,
      },
    })
    .then((response) => response.data);
}

export async function fetchStatusTimbrado(carpeta: string) {
  return await axios
    .get(API_URL + "/timbradostatus", {
      params: {
        carpeta: carpeta,
      },
    })
    .then((response) => response.data);
}

export async function fetchBuscaEmpleado(data: BusquedaEmpleado) {
  const fechaFormat = new FechaFormat();

  const fechaInicio = fechaFormat
    .convert(new Date(data.fechaInicio))
    .split("T");
  const fechaFin = fechaFormat.convert(new Date(data.fechaFin)).split("T");

  let desserts: EmpleadosData[] = [];
  await axios
    .post(API_URL + "/XmlRecibido/empleado", null, {
      params: {
        nombre: data.datoEmpleado,
        fechaInicio: fechaInicio[0],
        fechaFin: fechaFin[0],
        tipoBusqueda: data.tipoBusqueda,
      },
    })
    .then((response) => {
      desserts = response.data;
    });

  return desserts;
}

// Cantidad de timbrado y errores
export async function fetchDetallesAvance(
  tipoDetalle: number,
  nombreCarpeta: string
) {
  let desserts: DataAvanceEmpleado[] = [];

  await axios
    .get(API_URL + "/archivos/timbrado", {
      params: {
        nombreCarpeta: nombreCarpeta,
        tipo: tipoDetalle,
      },
    })
    .then((response) => {
      desserts = response.data;
    });

  return desserts;
}
