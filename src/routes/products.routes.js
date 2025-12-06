import {Router} from 'express' 
import {getProduct,getProducts,createNewProduct,deleteProductById,updateProductById} from "../controller/product.controller" 

const router = Router()

router.get('/', getProducts)
router.get('/:id', getProduct)

router.post('/crear', createNewProduct)
router.put('/:id', updateProductById)
router.delete('/:id', deleteProductById)

export default router