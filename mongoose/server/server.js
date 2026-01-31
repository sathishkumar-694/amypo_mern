const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const Person = mongoose.model("Person", {
  name: String,
  age: Number,
});

mongoose
  .connect("mongodb://localhost:27017/learning_mongoose")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/people", async (req, res) => {
  const people = await Person.find();
  res.json(people);
});

app.post("/people", async (req, res) => {
  const person = new Person(req.body);
  await person.save();
  res.json(person);
});

app.put("/people/:id", async (req, res) => {
  const updatedPerson = await Person.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  console.log(updatedPerson)
  res.status(200).json(updatedPerson);
});

app.listen(5000, () => 
    {
  console.log("Server running on http://localhost:5000");
});
