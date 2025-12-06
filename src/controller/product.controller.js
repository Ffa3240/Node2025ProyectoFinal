import * as productService from "../services/product.service.js"

export const getProducts = async (req,res) => {
    try {

        const products = await productService.getAllProducts()

        res.status(200).json(products)

    } catch(e) {
        res.status(500).json({msj:`Error al obtener los productos`, error: `${e.message}`})
    }

}

export const getProduct = async (req,res) => {
    try {
        const {id} = req.params
        
        const product = await productService.getproductById(id)

        if (!product) {
            return res.status(404).json({msj:'Producto no encontrado'})
        }

        res.status(200).json(product)

    } catch(e) {
        res.status(500).json({msj:'Error al obtener el producto', error: `${e.message}`})
    }

}


export const createNewProduct = async (req,res) => {
    try {
        
        const newProduct = await productService.createProduct(req.body)

        res.status(201).json({msj:'producto creado', producto: newProduct})

    } catch(e) {
        res.status(500).json({msj:'Error al crear un nuevo producto', error: `${e.message}`})
    }

}


export const deleteProductById = async (req,res) => {
    try {
        const {id} = req.params
        
        const deleted = await productService.deleteProduct(id)

        if (!deleted) {
            return res.status(404).json({msj:'Producto no encontrado'})
        }

        res.status(201).json({msj:'producto eliminado correctamente'})

    } catch(e) {
        res.status(500).json({msj:'Error al eliminar el producto', error: `${e.message}`})
    }

}

export const updateProductById = async (req,res) => {
    try {
        const {id} = req.params
        
        const updated = await productService.updateProduct(id, req.body)

        if (!updated) {
            return res.status(404).json({msj:'Producto no encontrado'})
        }

        res.status(201).json({msj:'producto actualizado correctamente'})

    } catch(e) {
        res.status(500).json({msj:'Error al actualizar el producto', error: `${e.message}`})
    }

}
