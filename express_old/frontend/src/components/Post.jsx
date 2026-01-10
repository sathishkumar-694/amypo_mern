import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

const API_URL = "http://localhost:5000/posts";

function Post() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(API_URL).then((res) => setPosts(res.data));
  }, []);
  return (
    <div className="container mt-4">
      <h3>React JS + Express JS + JSON - CRUD Operation</h3>

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
          {posts.map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.body}</td>
                <td className="d-flex flex-row gap-2 justify-content-center">
                  <Button className="btn btn-info">Edit</Button>
                  <Button className="btn btn-danger">Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Post;
