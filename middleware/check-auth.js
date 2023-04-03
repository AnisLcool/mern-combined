const HttpError = require("../models/http-error");
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {
    
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            throw new Error('auth failed');
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        req.userData = {userId: decodedToken.userId}
        next();
        
    } catch (error) {
        console.log(error);
        return next(new HttpError('Authentification failed', 403))   
    }
}

module.exports = authMiddleware;