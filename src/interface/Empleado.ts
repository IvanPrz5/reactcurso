export interface BusquedaEmpleado {
  datoEmpleado: string;
  fechaInicio: Date;
  fechaFin: Date;
  tipoBusqueda: string;
}

export interface EmpleadosData {
  id: number;
  nombreCarpeta: string;
  nombreArchivo: string;
  rutaXml: string;
  rutaXmlTimbrado: string;
  rutaCbbTimbrado: string;
  nombreCarga: string;
  uuidTimbrado: string;
  // Comprobante
  folio: string;
  descuento: number;
  subTotal: number;
  version: string;
  total: number;
  // Receptor
  nombre: string;
  usoCFDI: string;
  regimenFiscalReceptor: string;
  domicilioFiscalReceptor: string;
  rfc: string;
  //   ( Nomina)
  fechaFinalPago: string;
  totalPercepciones: number;
  totalOtrosPagos: number;
  totalDeducciones: number;
  fechaInicialPago: string;
  fechaPago: string;
  numDiasPagados: number;
  tipoNomina: string;
  //    ( EntidadSNCF)
  origenRecurso: string;
  //  ( Receptor)
  periodicidadPago: string;
  tipoContrato: string;
  claveEntFed: string;
  riesgoPuesto: string;
  tipoJornada: string;
  numSeguridadSocial: string;
  puesto: string;
  numEmpleado: string;
  antigüedad: string;
  curp: string;
  sindicalizado: string;
  banco: string;
  salarioDiarioIntegrado: string;
  cuentaBancaria: string;
  fechaInicioRelLaboral: string;
  salarioBaseCotApor: string;
  tipoRegimen: string;
  // ( Percepciones)
  totalGravado: string;
  totalExento: string;
  totalSueldos: string;
  //    ( Deducciones)
  totalImpuestosRetenidos: string;
}

export interface ArrayEmpleados {
  array: EmpleadosData[];
}
