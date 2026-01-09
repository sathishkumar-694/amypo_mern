//steps 
//1. import built in http module
//2 . define the port for where it needs to be run(5000)
//3. create the server
//=>define head

const http = require('http')
const PORT = 5000;
const server = http.createServer((req,res)=>  
{
    res.writeHead(200,{
        "Content-Type":"text/plain"
    })
    res.end(JSON.stringify({
        name:"Sathish",
        dept:"ece"
    }))
}
)

server.listen(PORT ,()=>
{
    console.log(`the server is running on port : ${PORT}`)
})