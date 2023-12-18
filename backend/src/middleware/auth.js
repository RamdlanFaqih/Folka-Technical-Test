export function requireAuth(req, res, next) {
    const tokenDecode = req.APP_DATA.tokenDecode;

    if (tokenDecode) {
        next();
    } else {
        res.status(401).json({
            message: "Login failed",
        });
    }
}
