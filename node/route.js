const http =require("http")
const server = http.createServer((req,res)=>
{
    if(req.url==="/")
    {
        res.end("Home page")
    }
    else if(req.url ==="/about")
    {
        res.end("About page")
    }
    else{
        res.end("404 not found")
    }
})

server.listen(5001 ,()=>
{
    console.log("server is wroking")
})