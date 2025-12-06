// _____________________________________________________________________________________________
// Importacion de Modulos
    import {Router} from 'express' 

    // Controllers
    import {getProducts,
            getProduct,
            createProduct,
            deleteProduct,
            updateProduct} from "../controllers/product.controller.js" 
   
     // Middlewares
     import { verifyToken } from "../middlewares/authJWT.js";
     import { checkAdmin  } from "../middlewares/authROL.js";
  
// _____________________________________________________________________________________________

const router = Router()

// _____________________________________________________________________________________________
// Rutas 
    // CRUD

    router.get('/', getProducts)
    router.get('/:id', getProduct)
    router.post('/crear',verifyToken, checkAdmin, createProduct)
    router.put('/:id'   ,verifyToken, checkAdmin, updateProduct)
    router.delete('/:id',verifyToken, checkAdmin, deleteProduct)
// _____________________________________________________________________________________________

export default router