import express, { Router, Request, Response, NextFunction } from "express";
import * as empresaService from "../services/empresaService";
import { authenticateToken } from "../middleware";

const router = express.Router();

router.get('/', authenticateToken, (_req : Request, res : Response, _next : NextFunction) => {
    const empresas = empresaService.getEmpresas();
    res.send(empresas);
});

router.post('/', authenticateToken, (req : Request, res : Response, _next : NextFunction) => {
    const { nombre, sitioWeb, notasAdicionales } = req.body;
    const result = empresaService.addEmpresa(nombre, sitioWeb, notasAdicionales);
    if (result) {
        res.send({ message: "Empresa agregada correctamente" });
    } else {
        res.status(400).send({ message: "Empresa ya existente" });
    }
});

router.delete('/:nombre', authenticateToken, (req : Request, res : Response, _next : NextFunction) => {
    const result = empresaService.deleteEmpresa(req.params.nombre);
    if (result) {
        res.send({ message: "Empresa eliminada correctamente" });
    } else {
        res.status(400).send({ message: "Empresa no existente" });
    }
});

router.delete('/:nombre/eliminarSiNoTienePersonas', authenticateToken, (req : Request, res : Response, _next : NextFunction) => {
    const { nombre } = req.params;
    const result = empresaService.deleteIfNotPersonas(nombre);
    if (result) {
        res.send({ message: "Empresa eliminada correctamente" });
    } else {
        res.status(400).send({ message: "Empresa no existente o tiene personas asociadas" });
    }
});

router.get('/:nombre', authenticateToken, (req : Request, res : Response, _next : NextFunction) => {
    const { nombre } = req.params;
    const empresa = empresaService.getEmpresa(nombre);
    if (empresa) {
        res.send(empresa);
    } else {
        res.status(400).send({ message: "Empresa no existente" });
    }
});

export default router;