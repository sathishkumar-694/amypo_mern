const fs = require("fs")
fs.writeFile("data.txt" , "dummy text" , (e)=>{
    if(e)
    {
        console.error("error creating file"+e)
    }
})

fs.readFile("data.txt", "utf-8" , (err, data)=>
{
    if(err)
    {
        console.log("error reading file")
    }
    else
    {
        console.log("Readed successfully")
        console.log(data)
    }
})

//appending
fs.appendFile("data.txt", "dummy text-2" , (err)=>
{
    if(err)
    {
        console.log("error")
    }
    else{
        console.log("appended")
    }
})

//delete
fs.unlink("data.txt",(err)=>
{
    if(err)
    {
        console.log("cannot delete : file not found")
    }
    else
        console.log("delete successfull")
})