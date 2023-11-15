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

router.delete('/:nombre',  (req, res) => {
    const { nombre } = req.params;
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

router.get('/:nombre', (req, res) => {
    const { nombre } = req.params;
    const empresa = empresaService.getEmpresa(nombre);
    if (empresa) {
        res.send(empresa);
    } else {
        res.status(400).send({ message: "Empresa no existente" });
    }
});

export default router;