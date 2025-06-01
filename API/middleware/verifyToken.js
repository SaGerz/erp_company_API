const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({message: "Token tidak teresedia, akses ditolak"})
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        
        console.log("Token berhasil di decoded : ", decode);
        next();
    } catch (error) {
        res.status(403).json({message: "Token tidak valid"});
    }
}

module.exports = verifyToken;