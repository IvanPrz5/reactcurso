import { monthNames } from "./Meses"; 

export default class FechaFormat {
  convert(date: Date) {
    return date
      .toLocaleString("sv", { timeZone: "America/Mexico_City" })
      .replace(" ", "T");
  }
  getMes(fecha: number | string) {
    const mes = monthNames[Number(fecha) - 1];
    return mes;
  }
}
