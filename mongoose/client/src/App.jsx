import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/people";

function App() {
  const [people, setPeople] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    age: "",
  });

  // FETCH ALL PEOPLE
  const fetchPeople = async () => {
    const res = await axios.get(API);
    setPeople(res.data);
  };

  // ADD PERSON
  const addPerson = async () => {
    if (!form.name || !form.age) {
      alert("Enter all fields");
      return;
    }

    const res = await axios.post(API, {
      name: form.name,
      age: Number(form.age),
    });

    setPeople([...people, res.data]);
    setForm({ name: "", age: "" });
  };

  // LOAD DATA ON PAGE LOAD
  useEffect(() => {
    fetchPeople();
  }, []);

  //start edit function

  const startEdit = (p) => {
    setEditId(p._id);
    setForm({
      name: p.name,
      age: p.age,
    });
  };

  //update function
  const updatePerson = async () => {
    if (!form.name || !form.age) {
      alert("Enter all fields");
      return;
    }

    await axios.put(`${API}/${editId}`, {
      name: form.name,
      age: Number(form.age),
    });

    setEditId(null);
    setForm({ name: "", age: "" });
    fetchPeople();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>MERN Stack CRUD - Application</h3>

      <input
        type="text"
        placeholder="Enter Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Enter Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />

      {editId ? (
        <button onClick={updatePerson}>Update</button>
      ) : (
        <button onClick={addPerson}>Add</button>
      )}

      <hr />

      {people.map((p) => (
        <div key={p._id}>
          <b>{p.name}</b> - {p.age}
          <button style={{ background: "red" }} onClick={() => startEdit(p)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
