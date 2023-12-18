// staticAuth.js
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export default function verifyToken(req, res, next) {
    try {
        const { token } = req.headers;
        
        if (!token) {
            return res.status(401).json({
                message: "Token is missing in the request headers."
            });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.APP_DATA = {
            tokenDecode: decodedToken,
        };
        
        console.log(req.APP_DATA);

        next();
    } catch (err) {
        res.status(401).json({
            message: "Invalid token. Please provide a valid token.",
            error: err.message
        });
    }
}
