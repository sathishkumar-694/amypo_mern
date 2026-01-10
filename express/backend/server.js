//import express
const express = require("express");
//file system to read and write
const fs = require("fs");
//cors for express
const cors = require("cors");
//express server
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const readData = () => {
  const data = fs.readFileSync("data.json");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync("data.json", JSON.stringify(data));
};
app.get("/posts", (req, res) => {
  const data = readData();
  return res.json(data.posts);
});

app.post("/posts", (req, res) => {
  const data = readData();
  const newPost = {
    id: Date.now(),
    title: req.body.title,
    body: req.body.body,
  };
  data.posts.push(newPost);
  writeData(data);
  res.json(newPost);
});

app.put("/posts/:id", (req, res) => {
  const data = readData();
  const postId = Number(req.params.id);

  data.posts = data.posts.map((p) =>
    p.id == postId ? { ...p, ...req.body } : p
  );
  writeData(data);
  res.json({ message: "post updated" });
});

app.delete("/posts/:id",(req,res)=>
{
    const data = readData();
    const deleteId = Number(req.params.id) ;
    data.posts = data.posts.filter((p)=>
    p.id!==deleteId)
    writeData(data)
    res.json({message:"post delted"})
})
app.listen(PORT, () => {
  console.log("server is running on port :", PORT);
  console.log(`web : http://localhost:${PORT}`);
});
