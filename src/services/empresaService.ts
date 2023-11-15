import { Empresa } from "../types";

export const empresas: Empresa[] = []

export const getEmpresas = (): Empresa[] => {
    return empresas;
}

export const addEmpresa = (nombreEmpresa: string, sitioWeb: string, notasAdicionales: string): boolean => {
    const newEmpresa: Empresa = {
        nombre: nombreEmpresa,
        sitioWeb: sitioWeb,
        notasAdicionales: notasAdicionales,
        personas: []
    }
    empresas.push(newEmpresa)
    return true
}

export const deleteEmpresa = (nombreEmpresa: string): boolean => {
    const index = empresas.findIndex(empresa => empresa.nombre === nombreEmpresa)
    const empresaElim = empresas[index]
    if (index === -1) {
        return false
    }
    empresas.splice(index, 1);

    for (const pers of empresaElim.personas!) {
        if(pers.empresa?.nombre === nombreEmpresa) {
            pers.empresa = undefined;
        }
    }
    return true
}

export const deleteIfNotPersonas = (nombreEmpresa: string): boolean => {
    const index = empresas.findIndex(empresa => empresa.nombre === nombreEmpresa)
    if (index === -1) {
        return false
    }
    if (empresas[index].personas?.length === 0) {
        empresas.splice(index, 1)
        return true
    }
    return false
}

export const getEmpresa = (nombreEmpresa: string): Empresa | undefined => {
    const index = empresas.findIndex(empresa => empresa.nombre === nombreEmpresa)
    if (index === -1) {
        return undefined
    }
    return empresas[index]
}

