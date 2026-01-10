import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/posts";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editData, setEditData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    fetchPost();
  }, []);
//fetching from data.json
  const fetchPost = () => {
    axios.get(API_URL).then((res) => setPosts(res.data));
  };

//add post
  const addPost = () => {
    if (!body || !title) return;
    
    axios.post(API_URL, { title, body }).then(() => {
      setPosts([...posts]);
      fetchPost();
      setTitle("");
      setBody("");
    });

  };

  //edit begin
  const [editId, setEditId] = useState(null);
  const startEdit = (post) => {
    setEditId(post.id);
    setEditData({
      title: post.title,
      body: post.body,
    });
  };

  //update when clicked
  const updatePost = () => {
    axios.put(`${API_URL}/${editId}`, editData).then(() => {
      setPosts(posts.map((p) => (p.id === editId ? { ...p, ...editData } : p)));
    
    setEditId(null);
    setEditData({ title: "", body: "" })
    });
  };

  //delete when clicked
  const deletePost = (id)=>
  {
   axios.delete(`${API_URL}/${id}`)
   .then(()=>
  {
    setPosts(posts.filter(p=>p.id!==id))
  })}


  //cancel edit 

  const cancelEdit = ()=>
  {
    setEditId(null)
    setEditData({
      title :"",
      body :""
    })
  }
  return (
    <div className="container">
      <h3>React JS + Express JS + JSON - CRUD operations</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <td>Title</td>
            <td>Body</td>
            <td>Actions</td>
          </tr>
        </thead>

        <tbody>
          {posts.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>

              <td>
                {editId === p.id ? (
                  <>
                    <input
                      value={editData.title}
                      onChange={(e) => {
                        setEditData({ ...editData, title: e.target.value });
                      }}
                    />
                  </>
                ) : (
                  p.title
                )}
              </td>

              <td>
                {editId === p.id ? (
                  <>
                    <input
                      value={editData.body}
                      onChange={(e) =>
                        setEditData({ ...editData, body: e.target.value })
                      }
                    />
                  </>
                ) : (
                  p.body
                )}
              </td>
              <td>
                {editId == p.id ? (
                  <>
                    <button className="btn btn-warning" onClick={updatePost}>
                      Update
                    </button>
                    <button className="btn btn-danger" onClick = {cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-1"
                      onClick={() => startEdit(p)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={()=>{deletePost(p.id)}}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="enter body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </td>
            <td>
              <button className="btn btn-primary btn-sm" onClick={addPost}>
                Add
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Posts;
