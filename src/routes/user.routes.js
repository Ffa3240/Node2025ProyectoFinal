// _____________________________________________________________________________________________
// Importacion de Modulos
    import { Router } from "express";

    // Controllers
    import { getUsers , 
             getUser , 
             createUser, 
             loginUser, 
             updateUser,
             deleteUser}   from "../controllers/user.controller.js"

    // Middlewares
    import { verifyToken } from "../middlewares/authJWT.js";
    import { checkAdmin  } from "../middlewares/authROL.js";
// _____________________________________________________________________________________________

const router = Router()

// _____________________________________________________________________________________________
// Rutas 
    // CRUD
    router.get('/'      ,getUsers);                            // Obtener Todos 
    router.get('/:id'   ,getUser);                             // Obtener Uno
    router.post('/crear',verifyToken, checkAdmin, createUser); // Crear 
    router.put('/:id'   ,verifyToken, checkAdmin, updateUser); // Actualizar
    router.delete('/:id',verifyToken, checkAdmin, deleteUser); // Eliminar
    
    router.post('/login',loginUser)                            // Iniciar Sesion
// _____________________________________________________________________________________________

export default router