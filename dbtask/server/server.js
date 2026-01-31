const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/dbtask")
  .then(async () => {
    console.log("MongoDB connected");

    // ======================
    // MODEL
    // ======================
    const StudentSchema = new mongoose.Schema({
      name: String,
      age: Number,
      city: String,
      course: String,
      marks: Number,
    });

    const Student = mongoose.model("Student", StudentSchema);

    // Clear old data (important for same output)
    await Student.deleteMany({});

    // ======================
    // INSERT (SEED DATA)
    // ======================
    await Student.insertMany([
      { name: "Manoj", age: 22, city: "Coimbatore", course: "MERN", marks: 78 },
      { name: "Ragul", age: 25, city: "Chennai", course: "Java", marks: 66 },
      { name: "Priya", age: 19, city: "Coimbatore", course: "Python", marks: 88 },
      { name: "Karthik", age: 28, city: "Bangalore", course: "MERN", marks: 52 },
      { name: "Divya", age: 21, city: "Coimbatore", course: "AI", marks: 91 },
      { name: "Sneha", age: 18, city: "Chennai", course: "Python", marks: 73 },
      { name: "Arjun", age: 24, city: "Hyderabad", course: "Java", marks: 35 },
      { name: "Meena", age: 20, city: "Bangalore", course: "MERN", marks: 60 },
      { name: "Santhosh", age: 23, city: "Chennai", course: "AI", marks: 47 },
      { name: "Kavya", age: 26, city: "Coimbatore", course: "Java", marks: 84 },
    ]);

    console.log("Inserted 10 students");

    // ======================
    // A) READ
    // ======================
    console.log(await Student.find());
    console.log(await Student.find({ city: "Coimbatore" }));
    console.log(await Student.find({ age: { $gte: 21 } }));
    console.log(await Student.find({ marks: { $gt: 80 } }));
    console.log(await Student.findOne({ name: "Priya" }));
    console.log(await Student.find({ course: "MERN" }));
    console.log(await Student.find({ city: "Chennai", marks: { $gte: 60 } }));
    console.log(await Student.find({ $or: [{ city: "Bangalore" }, { age: { $lt: 20 } }] }));

    // ======================
    // B) SORT / LIMIT / PROJECTION
    // ======================
    console.log(await Student.find().sort({ age: 1 }));
    console.log(await Student.find().sort({ marks: -1 }));
    console.log(await Student.find().sort({ marks: -1 }).limit(3));
    console.log(await Student.find().sort({ age: 1 }).limit(2));
    console.log(await Student.find({}, { _id: 0, name: 1, city: 1 }));

    // ======================
    // C) UPDATE
    // ======================
    await Student.updateOne({ name: "Karthik" }, { city: "Hyderabad" });
    console.log("Updated successfully");

    await Student.updateOne({ name: "Sneha" }, { marks: 80 });
    console.log("Updated successfully");

    await Student.updateOne({ name: "Meena" }, { $inc: { marks: 10 } });
    console.log("Updated successfully");

    await Student.updateMany({ city: "Chennai" }, { course: "MERN" });
    console.log("Updated successfully");

    await Student.updateMany({ city: "Coimbatore" }, { $inc: { marks: 5 } });
    console.log("Updated successfully");

    // ======================
    // D) DELETE
    // ======================
    const del1 = await Student.deleteOne({ name: "Arjun" });
    console.log("Deleted:", del1.deletedCount);

    const del2 = await Student.deleteMany({ marks: { $lt: 50 } });
    console.log("Deleted:", del2.deletedCount);

    const del3 = await Student.deleteMany({ age: { $lt: 20 } });
    console.log("Deleted:", del3.deletedCount);

    // ======================
    // E) FINAL OUTPUT
    // ======================
    console.log("Final Students:", await Student.find());
    console.log("Total Students:", await Student.countDocuments());

    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
