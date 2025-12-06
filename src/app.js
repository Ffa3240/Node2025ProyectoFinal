// --------------------------------------------------------------------------------------------
// Importacion de Modulos
    import express from "express"
    import "dotenv/config"
    import userRouter from "./routes/user.routes.js"
    import productRouter from "./routes/product.routes.js"
    import cors from "cors"
// --------------------------------------------------------------------------------------------

const app = express()

// --------------------------------------------------------------------------------------------
// Middlewares
    app.use(express.json())
    app.use(cors())
// --------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------
// Rutas
    app.use(['/users','/usuarios'],userRouter)
    app.use(['/products','/productos'], productRouter)

    app.use((req,res) => {
        res.status(404).json({error:"ruta no encontrada"})
    })
// --------------------------------------------------------------------------------------------
    

// --------------------------------------------------------------------------------------------
// Servidor 
    const APLICACION = process.env.APPNAME || '** Desconocida **'
    const PORT = process.env.PORT || 3001
    app.listen(PORT,()=> {
        console.log(`________________________________________________________________________`)
        console.log(`Servidor ${APLICACION} arrancado en puerto`, 3000)
        console.log(`________________________________________________________________________`)
        console.log(`Usuario principal para probar la aplicacion:`)
        console.log(`Usuario.: admin`)
        console.log(`Password: admin123`)
        console.log(`________________________________________________________________________`)
      console.log(``)
        console.log(`Acceda desde aqui: 👉 http://localhost:${PORT}`)
        console.log(``)
        console.log(`________________________________________________________________________`)
    })
