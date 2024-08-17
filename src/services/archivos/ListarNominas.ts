import { SubirNomina } from "@/interface/Nominas";
import axios from "axios";
import { API_URL } from "../config";
import FechaFormat from "@/utils/FechaFormat";

export async function fetchListarNominas(nombreCarga: string) {
  const fechaFormat = new FechaFormat();
  const formData = new FormData();
  formData.append("nombreCarga", nombreCarga);

  let desserts: SubirNomina[] = [];
  await axios
    .post(API_URL + "/archivos/resultadoCarga", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
        desserts= response.data;
        for(let i=0; i<desserts.length; i++){
            desserts[i].fechaEnvio = fechaFormat.getFechaActual();
        }
    });
  return desserts;
}
