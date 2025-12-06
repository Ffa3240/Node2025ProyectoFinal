import express from "express"
//import userRouter from "./routes/users.routes"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())


const productos = [
    {id: '1', codigo: 'A'},
    {id: '2', codigo: 'B'}
]

app.get('/products', (req,res) => {
    res.json(productos)
} )




/*
app.get('/products/2', (req,res) => {
    const product = productos.find(item => item.id == 2)
    res.json(product)
} )
*/

app.get('/products/search', (req,res) => {
    
    console.log(req.query)
    res.send('ok')
    const {nombre} = req.query
    const filtered = productos.filter(item => item.codigo.includes(nombre.toLowerCase))
    res.status(200).json(filtered)
} )


app.get('/products/:id', (req,res) => {
    
    console.log(req.params)
    
    const {id} = req.params
    
    const product = productos.find(item => item.id == id)
    console.log('producto:',product)
   
    if (!product) {
        res.status(404).json({'Error':'Producto inexistente'})   
    } else {
        res.status(200).json(product)
    }
} )



app.get('/', (req, res) => {
    res.send("Hola desde server")
})

app.listen(3000, () => {
    console.log("server arrancado en ", 3000)
})