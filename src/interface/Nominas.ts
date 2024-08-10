export interface Nomina{
    id: number;
    idRelacionNomina: string | null ;
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
}

export interface NominaArray{
    array: Nomina[];
}