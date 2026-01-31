import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios"
const URL = "http://localhost:5000";
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [message, setMessage] = useState("");
  //when submit is clicked
  const handleSubmit = async()=>
  {
    try{
        const res = await axios.post(URL+"/login" , form)
        setToken(res.data.token)
        setRole(res.data.role)
        setMessage(res.data.message)
        localStorage.setItem("token" , res.data.token);
        localStorage.setItem("role" , res.data.role);
        console.log("Login successful")
        setForm({
          email:"",
          password:""
        })
    }
    catch(error)
    {
        setMessage(error?.response?.data?.message || "login failed")
    }

  }
  //fetching the user-(validation and data getting)
  const userAPI = async()=>
  {
    try {
        const res = await axios.get(URL +"/profile",{
        headers :{
            Authorization:"Bearer "+token
        }
    })
        setMessage(res.data.message)      
    } 
    catch (error) 
    {
      setMessage("invalid token")
        
    }
  }

  //admin verification
  const adminAPI = async()=>
  {
    try{
      const res = await axios.get(URL +"/admin",{
        headers:{"Authorization":"Bearer"+token}
      })
      setMessage(res.data.message)
    }

  
  catch(error)
  {
    setMessage(error.message)

  }
}

  const logout =()=>
  {
    localStorage.removeItem("token")
    setToken(null);
    setRole(null)
    localStorage.removeItem("role")
    setMessage("")
  }


  // DOM starts
  if(!token){
  return (
    <>
      <div className="d-flex flex-column gap-3 justify-content-center align-items-center ">
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="johndoe@gmail.com"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="enter password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );
}


    return (
    <div className="text-center">
        <Button>UserAPI</Button>
      {role ==="admin"  && <Button>Admin API</Button>}
      <Button onClick={logout}>Logout</Button>
    </div>
  );

};

export default Login;
