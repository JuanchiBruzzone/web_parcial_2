import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from "express";
import {token} from "./index"

function authenticateToken(req : Request, res : Response, _next : NextFunction) {
    const authHeader = req.headers['authorization']
    const tokenToCheck = authHeader && authHeader.split(' ')[1]

    if (tokenToCheck == null) {
        return res.sendStatus(401);
    }

    if (!token.localeCompare(tokenToCheck)) {
        return res.sendStatus(401);
    }

    try {
        jwt.verify(tokenToCheck, "SeisSieteOchoNueveDiez");
        _next();
        return true;
    }
    catch {
        res.status(401).send( {error: "Token Invalido. "} );
        return false;
    }
}

export {authenticateToken};