export interface Nomina {
  id: number;
  idRelacionNomina: string | null;
  numEjecucion: string;
  docContable: string;
  fechaEnvio: string;
  descripcion: string;
  nombreCarga: string;
  fechainicio: string;
  fechafin: string;
  fechaPago: string;
  carpeta: string;
  año: number;
  mes: number | string;
  no: number;
  totalEmpledos: number;
  percepciones: number;
  deducciones: number;
  otrosPagos: number;
  neto: number;
  totalIsr: number;

  // se añadio para mostrar no se cacha en la api
  mesLetra: string;
}

export interface SubirNomina {
  fechainicialpago: string;
  fechafinalpago: string;
  fechapago: string;
  nombrecarpeta: string;
  cantidad: number;
  total: number;
  percepciones: number;
  deducciones: number;
  otrosPagos: number;
  isr: number;

  // se añadio para mostrar no se cacha en la api
  fechaEnvio: string;
}
