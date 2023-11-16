import jwt from 'jsonwebtoken';

function validacionToken(req: any, res: any, next: any) {
        let token: string = req.headers['authorization'].split(' ')[1];
        try{
            jwt.verify(token, 'shhhhh');
            next();
            return true;
        }catch(e){
            res.send({error: 'Token invalido'});
        }
        return false;
}
export {validacionToken};