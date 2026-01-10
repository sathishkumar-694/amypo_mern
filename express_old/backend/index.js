const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const readData = ()=>
{
    const data = fs.readFileSync("data.json")
    return JSON.parse(data)
}

const writeData = (data) =>
{
    fs.writeFileSync("data.json" , JSON.stringify(data))
}

app.get("/posts",(req, res)=>
{
    const val = readData()
    res.json(val.posts)
})

app.post("/post" , (req,res)=>
{
    const data = readData()
    //creating for storing new obj
    const newData = {
        id: Date.now() , 
        title : req.body.title,
        body : req.body.body
    }
    data.posts.push(newData)
    res.json(newData)
})


app.put("/posts/:id", (req, res) => {
  const data = readData();

  // Get the POST ID from URL and convert that to number
  const postId = Number(req.params.id);

  // Update the matching post
  data.posts = data.posts.map(p =>
    p.id === postId ? { ...p, ...req.body } : p
  );

  // Save the updated data to JSON
  writeData(data);

  res.json({ message: "Post Updated" });
});

// DELETE Method - Delete the Post
app.delete("/posts/:id", (req, res) => {
  // Read the old data
  const data = readData();

  // Get the POST ID from URL and convert that to number
  const postId = Number(req.params.id);

  // Remove the post which matches the ID
  data.posts = data.posts.filter(p => p.id !== postId);

  // Save the updated data back to JSON
  writeData(data);

  res.json({ message: "Post Deleted" });
});

app.listen(PORT , ()=>
{
    console.log("Server is running on port", PORT)
})