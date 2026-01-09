import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const Posts = () => {
  // -------------------- STATE --------------------
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    body: "",
  });

  // -------------------- READ --------------------
  useEffect(() => {
    axios.get(API_URL).then((res) => setPosts(res.data.slice(0, 50)));
  }, []);

  // -------------------- CREATE --------------------
  const addPost = () => {
    if (!title || !body) {
      alert("Fields should not be empty");
      return;
    }

    axios
      .post(API_URL, {
        title,
        body,
        userId: 1,
      })
      .then((res) => {
        setPosts([...posts, res.data]);
        setTitle("");
        setBody("");
      });
  };

  // -------------------- DELETE --------------------
  const deletePost = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setPosts(posts.filter((p) => p.id !== id)));
      if(!window.confirm("Are you sure want to delete"))
      return;
  };

  // -------------------- START EDIT --------------------
  const editStart = (post) => {
    setEditId(post.id);
    setEditData({
      title: post.title,
      body: post.body,
    });
  };

  // -------------------- UPDATE --------------------
  const updateEdit = () => {
    if (!editData.title || !editData.body) {
      alert("Fields should not be empty");
      return;
    }
    axios
      .put(`${API_URL}/${editId}`, {
        title: editData.title,
        body: editData.body,
        userId: 1,
      })
      .then((res) => {
        setPosts(posts.map((p) => (p.id === editId ? res.data : p)));
        setEditId(null);
        setEditData({ title: "", body: "" });
      });
      
    if(!window.confirm("Are you sure want to update"))
      return;

  };

  // -------------------- CANCEL EDIT --------------------
  const cancelEdit = () => {
    setEditId(null);
    setEditData({ title: "", body: "" });
  };


  //clear feed
  //============================================
  const clearText =()=>
{
  setBody("")
  setTitle("")
  
}
  //============================================


  // -------------------- UI --------------------
  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div style={{ width: "85%" }}>
        <h3>Post List</h3>

        <table className="table table-bordered table-sm align-middle">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>ID</th>
              <th style={{ width: "25%" }}>Title</th>
              <th style={{ width: "35%" }}>Body</th>
              <th style={{ width: "10%"}}>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  className="form-control"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                <Button onClick={addPost} className="btn btn-primary">
                  Add
                </Button>
                <Button onClick={clearText} className="btn btn-danger">Clear</Button>
                </div>
              </td>
            </tr>
            {posts.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>

                {/* TITLE CELL */}
                <td
                  style={{ maxWidth: "250px" }}
                >
                  {editId === p.id ? (
                    <input
                      className="form-control"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          title: e.target.value,
                        })
                      }
                    />
                  ) : (
                    p.title
                  )}
                </td>

                {/* BODY CELL */}
                <td
                  style={{ maxWidth: "350px" }}
                >
                  {editId === p.id ? (
                    <input
                      className="form-control"
                      value={editData.body}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          body: e.target.value,
                        })
                      }
                    />
                  ) : (
                    p.body
                  )}
                </td>

                {/* ACTIONS */}
                <td style={{padding:"10px"}}>
                  <div className="d-flex gap-2 justify-content-center">
                    {editId === p.id ? (
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
                          onClick={() => editStart(p)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="btn btn-danger"
                          onClick={() => deletePost(p.id)}
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

export default Posts;
