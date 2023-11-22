import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Parcial 2 - Desarrollo Web y Mobile',
        description: 'Implementacion de Swagger para Express/Node. NO USAR EL PARAMETER AUTORIZATION EN LOS ENDPOINTS.' +
            'PRIMERO USAR /auth/token y con el resultado dar click en Authorize y colocar el token ahi, luego se pueden hacer' +
            'todas las requests que se desean.'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);