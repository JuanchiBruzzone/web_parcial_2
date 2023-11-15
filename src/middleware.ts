export function validacionToken(res: any, req: any, next: any) {
    let bearer = req.headers.authorization;
    if(typeof bearer !== 'undefined'){
        bearer.split(' ')[1];
        req.token = bearer;
        next()
    }
    else{
        res.status(401).send({ error: 'token missing or invalid' });
    }
}