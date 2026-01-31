import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';
import Products from './components/Products';
import AddUser from './components/AddUser';
import AddProduct from './components/AddProduct';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Router>
      <NavBar />
      <Container className="mt-4 flex-column d-flex align-items-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
