import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Comments = () => {
  const API_URL = "https://jsonplaceholder.typicode.com/comments";

  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    body: "",
  });

  useEffect(() => {
    axios.get(API_URL).then((res) => setComments(res.data.slice(0, 50)));
  }, []);

  // -------------------- CREATE --------------------
  const addComment = () => {
    if (!name || !email || !body) {
      alert("All fields required");
      return;
    }

    axios
      .post(API_URL, {
        name,
        email,
        body,
        userId: 1,
      })
      .then((res) => setComments([...comments, res.data]));

    setName("");
    setEmail("");
    setBody("");
  };

  // -------------------- START EDIT --------------------
  const editStart = (c) => {
    setEditId(c.id);
    setEditData({
      name: c.name,
      email: c.email,
      body: c.body,
    });
  };

  // -------------------- DELETE --------------------
  const deleteComment = (id) => {
    if (!window.confirm("Are you sure want to delete?")) return;

    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setComments(comments.filter((c) => c.id !== id)));
  };

  // -------------------- UPDATE --------------------
  const updateEdit = () => {
    if (!editData.name || !editData.email || !editData.body) {
      alert("Fields should not be empty");
      return;
    }

    if (!window.confirm("Are you sure want to update?")) return;

    axios
      .put(`${API_URL}/${editId}`, {
        name: editData.name,
        email: editData.email,
        body: editData.body,
        userId: 1,
      })
      .then((res) => {
        setComments(
          comments.map((c) => (c.id === editId ? res.data : c))
        );
        setEditId(null);
        setEditData({ name: "", email: "", body: "" });
      });
  };

  // -------------------- CANCEL EDIT --------------------
  const cancelEdit = () => {
    setEditId(null);
    setEditData({ name: "", email: "", body: "" });
  };
//==========================================================
const clearText =()=>
{
  setBody("")
  setName("")
  setEmail("")
}
//==========================================================
  // -------------------- UI --------------------
  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div style={{ width: "85%" }}>
        <h3>Comments List</h3>

        <table className="table table-bordered table-sm align-middle">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>ID</th>
              <th style={{ width: "20%" }}>Name</th>
              <th style={{ width: "25%" }}>Email</th>
              <th style={{ width: "35%" }}>Body</th>
              <th style={{ width: "20%" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  className="form-control"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                <input
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
              <td>
                <input
                  className="form-control"
                  placeholder="Enter body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </td>
              <td style={{padding:"10px"}}>
              <div className="d-flex gap-2 justify-content-center">
                <Button onClick={addComment} className="btn btn-primary">
                  Add
                </Button>
                <Button onClick={clearText} className="btn btn-danger">Clear</Button>
                </div>
              </td>
              
            </tr>
            {comments.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>

                {/* NAME */}
                <td style={{ maxWidth: "200px" }}>
                  {editId === c.id ? (
                    <input
                      className="form-control"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  ) : (
                    c.name
                  )}
                </td>

                {/* EMAIL */}
                <td    style={{ maxWidth: "220px" }}>
                  {editId === c.id ? (
                    <input
                      className="form-control"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                  ) : (
                    c.email
                  )}
                </td>

                {/* BODY */}
                <td    style={{ maxWidth: "350px" }}>
                  {editId === c.id ? (
                    <input
                      className="form-control"
                      value={editData.body}
                      onChange={(e) =>
                        setEditData({ ...editData, body: e.target.value })
                      }
                    />
                  ) : (
                    c.body
                  )}
                </td>

                {/* ACTIONS */}
                <td style={{padding:"10px"}}>
                  <div className="d-flex gap-2 justify-content-center ">
                    {editId === c.id ? (
                      <>
                        <Button
                          className="btn btn-success"
                          onClick={updateEdit}
                        >
                          Update
                        </Button>
                        <Button
                          className="btn btn-secondary"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="btn btn-primary"
                          onClick={() => editStart(c)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="btn btn-danger"
                          onClick={() => deleteComment(c.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
