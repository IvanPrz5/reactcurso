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

  getFechaActual() {
    const m = new Date();
    const dateString =
      m.getUTCFullYear() +
      "-" +
      ("0" + (m.getUTCMonth() + 1)).slice(-2) +
      "-" +
      ("0" + m.getUTCDate()).slice(-2);
    return dateString;
  }
}
