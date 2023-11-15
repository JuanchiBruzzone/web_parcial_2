export interface Empresa {
    nombre?: string;
    sitioWeb?: string;
    notasAdicionales?: string;
    personas?: Persona[];
}

export interface Persona {
    nombre?: string;
    apellido?: string;
    email?: string;
    telefono?: string;
    empresa?: Empresa;
}