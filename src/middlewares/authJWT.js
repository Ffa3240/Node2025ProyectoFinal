// --------------------------------------------------------------------------------------------
// Importacion de Modulos
    import jwt from "jsonwebtoken"
// --------------------------------------------------------------------------------------------

// VERIFICACION EXISTENCIA Y VIGENCIA DE TOKEN DE ACCESO
export const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({msj:"acceso denegado"})

    // Desde mi prueba con SOAPUI no haci falta saltar el primer argumento
    const token = authHeader.split(" ")[1] || authHeader;

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
        req.user = decoded
        next();
    } catch(err){
   
        return res.status(403).json({msj:"Token invalido o expirado"})
    }
}

