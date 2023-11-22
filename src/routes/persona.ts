import express, {NextFunction, Request, Response} from 'express';
import * as personaService from "../services/personaService";
import  {authenticateToken}  from '../middleware';


const router = express.Router();

router.get('/', authenticateToken, (_req : Request, res : Response, _next : NextFunction) => {
    const personas = personaService.getPersonas();
    res.send(personas);
});

router.post('/add', authenticateToken, (req : Request, res : Response, _next : NextFunction) => {
    const { nombre, apellido, telefono, email, empresa } = req.body;
    const result = personaService.addPersona(nombre, apellido, telefono, email, empresa);
    if (result) {
        res.send({ message: "Persona agregada correctamente" });
    } else {
        res.status(400).send({ message: "Persona ya existente" });
    }
});

router.delete('/:nombre', authenticateToken, (req : Request, res : Response, _next : NextFunction) => {
    const { nombre } = req.params;
    const result = personaService.deletePersona(nombre);
    if (result) {
        res.send({ message: "Persona eliminada correctamente" });
    } else {
        res.status(400).send({ message: "Persona no existente" });
    }
});

router.get('/:nombre',authenticateToken, (req : Request, res : Response, _next : NextFunction) => {
    const { nombre } = req.params;
    const persona = personaService.getPersona(nombre);
    if (persona) {
        res.send(persona);
    } else {
        res.status(400).send({ message: "Persona no existente" });
    }
});

router.get('/:apellido',authenticateToken, (req : Request, res : Response, _next : NextFunction) => {
    const { apellido } = req.params;
    const personas = personaService.getPersonasByApellido(apellido);
    if (personas) {
        res.send(personas);
    } else {
        res.status(400).send({ message: "Persona no existente" });
    }
});

export default router;