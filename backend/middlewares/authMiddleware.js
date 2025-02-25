const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) {
        return res.status(404).json({
            message : "Access denied. No token provided!"
        })
    }

    jwt.verify(token, process.env.JWT_PASSWORD, (err,decoded) => {
        if(err) {
            if(err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message : "Token expired!"
                })
            }
            else {
                return res.status(401).json({
                    message : "Invalid token!"
                })
            }
        }
        
        req.user = decoded;
        next();
    })
}

module.exports = authMiddleware;