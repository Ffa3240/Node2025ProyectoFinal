const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
   
    // console.log('Req:', req)
   // console.log('Res:', res)
   
   //console.dir(req,{depth:1})
   //console.dir(res,{depth:1})

   //res.statusCode = 200
   //res.setHeader("Content-type","text/plain")

   res.writeHead(200,{"content-type":"text/plain"})
   res.end("OK")


})

server.listen(port, ()  => {
    console.log("server arrancado en ", port)
})