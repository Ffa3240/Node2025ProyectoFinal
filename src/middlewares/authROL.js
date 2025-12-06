// VERIFICACION ROL DE ACCESO
export const checkAdmin = (req,res,next) => {
    if(req.user && req.user.rol === 'admin'){
        next()
    } else {
        res.status(403).json({msj:"Rol de acceso denegado"})
    }
}