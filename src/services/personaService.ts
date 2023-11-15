import { Empresa, Persona } from "../types";
import { empresas } from "./empresaService";


export const personas: Persona[] = []



export const getPersonas = (): Persona[] => {
    return personas;
}

export const addPersona = (nombrePersona: string, apellidoPersona: string, tel: string, email: string, empresa: Empresa): boolean => {
    const newPersona: Persona = {
        nombre: nombrePersona,
        apellido: apellidoPersona,
        telefono: tel,
        email: email,
        empresa: empresa
    }
    personas.push(newPersona)

    const index = empresas.findIndex(e => e.nombre === empresa.nombre);
    if (index === -1) {
        return false;
    }

    const searchedEmpresa = empresas[index].personas;
    if (empresas[index].personas) {
        empresas[index].personas?.push(newPersona);
    }

    return true
}

export const deletePersona = (nombrePersona: string): boolean => {
    const index = personas.findIndex(persona => persona.nombre === nombrePersona)
    const personaElim = personas[index]
    if (index === -1) {
        return false
    }
    personas.splice(index, 1)
    
    for (const empresa of empresas) {
        const index1 = empresa.personas?.findIndex(persona => persona.nombre === personaElim.nombre);
        if (index1 !== undefined && index1 !== -1) {
            empresa.personas?.splice(index, 1);
            break;
        }
    }

    return true
}

export const getPersona = (nombrePersona: string): Persona | undefined => {
    return personas.find(persona => persona.nombre === nombrePersona)
}

export const getPersonasByApellido = (apellidoPersona: string): Persona[] => {
    return personas.filter(persona => persona.apellido === apellidoPersona)
}


