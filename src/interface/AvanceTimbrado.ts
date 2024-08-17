export interface CantXmlTimbrado{
    id: number;
    carpeta: string;
    cantidadXml: number
    cantidadExito: number
    cantidadError: number
    inicioTimbrado: string;
    finTimbrado: string;
    detenerForzada: boolean;
}

export interface DataAvanceEmpleado{
    id: string;
    nombre: string;
    rfc: string;
    uuidTimbrado: string;
    nombreCarpeta: string;
    nombreArchivo: string;
    numEmpleado: string;
}