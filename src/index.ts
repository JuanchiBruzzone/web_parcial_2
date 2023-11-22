import express from 'express'
import manejoRutas from './routes/indexRoutes'
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import jwt from "jsonwebtoken";

//simulo base de datos para JWT
const token: string = ""

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use(express.json()) //middleware

const PORT = 3000

app.get('/ping', (_req, res) => {
    res.send( { health: "OK", version: "2.0" ,message: "pong"})
})

app.get('/auth/token', (req, res) => {
    let token = jwt.sign("UnoDosTresCuatroCinco", "SeisSieteOchoNueveDiez");
    res.send(token);
})

app.use('/api', manejoRutas);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

export {token};
