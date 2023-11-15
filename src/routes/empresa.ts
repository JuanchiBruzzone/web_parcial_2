import express, { Router } from "express";
import * as empresaService from "../services/empresaService";
import { validacionToken } from "../middleware";


const router = express.Router();


router.get('',  (_req, res) => {
    const empresas = empresaService.getEmpresas();
    res.send(empresas);
});

router.post('', (req, res) => {
    const { nombre, sitioWeb, notasAdicionales } = req.body;
    const result = empresaService.addEmpresa(nombre, sitioWeb, notasAdicionales);
    if (result) {
        res.send({ message: "Empresa agregada correctamente" });
    } else {
        res.status(400).send({ message: "Empresa ya existente" });
    }
});

/*
    -- Metodo con nombre en la url

    router.delete('/:nombre',  (req?, res?) => {
    const { nombre } = req.params;
    const result = empresaService.deleteEmpresa(nombre);
    if (result) {
        res.send({ message: "Empresa eliminada correctamente" });
    } else {
        res.status(400).send({ message: "Empresa no existente" });
    }
});
 */

// -- Metodo con query params
router.delete('/borrar',  (req?, res?) => {
    const nombre : any = req.query.nombre;
    const result = empresaService.deleteEmpresa(nombre);
    if (result) {
        res.send({ message: "Empresa eliminada correctamente" });
    } else {
        res.status(400).send({ message: "Empresa no existente" });
    }
});



router.delete('/:nombre/eliminarSiNoTienePersonas', (req, res) => {
    const { nombre } = req.params;
    const result = empresaService.deleteIfNotPersonas(nombre);
    if (result) {
        res.send({ message: "Empresa eliminada correctamente" });
    } else {
        res.status(400).send({ message: "Empresa no existente o tiene personas asociadas" });
    }
});

// Metodo con nombre en el url
router.get('/:nombre', (req, res) => {
    const { nombre } = req.params;
    const empresa = empresaService.getEmpresa(nombre);
    if (empresa) {
        res.send(empresa);
    } else {
        res.status(400).send({ message: "Empresa no existente" });
    }
});

/*
    -- Metodo con nombre en el query params

    router.get('/unicaEmpresa', (req, res) => {
    const  nombre : any = req.query.nombre;
    const empresa = empresaService.getEmpresa(nombre);
    if (empresa) {
        res.send(empresa);
    } else {
        res.status(400).send({ message: "Empresa no existente" });
    }
});
 */


export default router;