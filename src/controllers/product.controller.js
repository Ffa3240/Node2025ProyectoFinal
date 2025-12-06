// _____________________________________________________________________________________________
// Importacion de Modulos
    import * as productService from "../services/product.service.js"
// _____________________________________________________________________________________________

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// INICIO DE CRUD

// OBTENER TODOS LOS PRODUCTOS
    export const getProducts = async (req,res) => {
        try {
            const products = await productService.getProducts()
            res.status(200).json(products)
        } catch(e) {
            res.status(500).json({msj:`Error al obtener los productos`, error: `${e.message}`})
        }
    }

// OBTENER UN PRODUCTO
    export const getProduct = async (req,res) => {
        try {
            const {id} = req.params
            const product = await productService.getProduct(id)
            if (!product) {
                return res.status(404).json({msj:'Producto no encontrado'})
            }
            res.status(200).json(product)
        } catch(e) {
            res.status(500).json({msj:'Error al obtener el producto', error: `${e.message}`})
        }
    }

// CREAR UN PRODUCTO
    export const createProduct = async (req,res) => {
        try {
            const newProduct = await productService.createProduct(req.body)
            res.status(201).json({msj:'producto creado', producto: newProduct})
        } catch(e) {
            res.status(500).json({msj:'Error al crear un nuevo producto', error: `${e.message}`})
        }
    }

// ELIMINAR UN PRODUCTO
    export const deleteProduct = async (req,res) => {
        try {
            const {id} = req.params            
            const deleted = await productService.deleteProduct(id)
            if (!deleted) {
                return res.status(404).json({msj:'Producto no encontrado'})
            }
            res.status(201).json({msj:'producto eliminado correctamente', producto: deleted})
        } catch(e) {
            res.status(500).json({msj:'Error al eliminar el producto', error: `${e.message}`})
        }
    }

// ACTUALIZAR UN PRODUCTO
    export const updateProduct = async (req,res) => {
        try {
            const {id} = req.params
            const updated = await productService.updateProduct(id, req.body)
            if (!updated) {
                return res.status(404).json({msj:'Producto no encontrado'})
            }
            res.status(201).json({msj:'producto actualizado correctamente', producto: updated})
        } catch(e) {
            res.status(500).json({msj:'Error al actualizar el producto', error: `${e.message}`})
        }
    }

// FIN CRUD
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
