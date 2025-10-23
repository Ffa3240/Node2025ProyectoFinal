import express from "express"

const app = express()

app.get('/', (req, res) => {
    res.send("Hola desde server")
})

app.listen(3000, () => {
    console.log("server arrancado en ", 3000)
})