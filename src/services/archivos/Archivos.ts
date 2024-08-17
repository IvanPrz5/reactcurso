import axios from "axios";
import * as XLSX from "xlsx";
import { API_URL } from "../config";
import { DataAvanceEmpleado } from "@/interface/AvanceTimbrado";
import { EmpleadosData } from "@/interface/Empleado";
import { InputsFiles, ResultCargaFile } from "@/interface/SubirArchivos";

export async function fetchSubirArchivos(data: InputsFiles) {
  const formData = new FormData();
  for (let i = 0; i < data.archivos.length; i++) {
    formData.append("archivos", data.archivos[i]);
    formData.append("nombreCarga", data.nombreCarga);
    formData.append("isTimbrado", data.isTimbrado);
  }

  let desserts: ResultCargaFile[] = [];
  await axios
    .put(API_URL + "/archivos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      desserts = response.data;
    });
  return desserts;
}

export async function fetchDownFile(
  tipoArchivo: number,
  uuidTimbrado: string,
  carpeta: string,
  nombreArchivo: string
) {
  const tipos = [".xml", ".png", ".pdf"];
  await axios
    .get(
      API_URL + "/timbradoresultado/file/" + tipoArchivo + "/" + uuidTimbrado,
      {
        responseType: "blob",
        params: {
          nombreCarpeta: carpeta,
          nombreArchivo: nombreArchivo,
        },
      }
    )
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        nombreArchivo.replace(".XML", "") + tipos[tipoArchivo - 1]
      );
      document.body.appendChild(link);
      link.click();
    })
    .catch((e) => {
      console.log("Fatal " + e);
    });
}

export function rowsEmpleadoToExcel(
  array: DataAvanceEmpleado[] | EmpleadosData[]
) {
  try {
    const worksheet = XLSX.utils.json_to_sheet(array);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
    XLSX.writeFile(workbook, "Reporte.xls", { compression: true });
  } catch (error) {
    console.log(error);
  }
}
