import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [formData, setFormData] = useState({ name: '', email: '', age: '', address: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/users', formData);
        navigate('/users');
    };

    return (
        <div className="w-100 p-3">
            <h2>Add User</h2>
            <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        placeholder="Enter Name" 
                        value={formData.name} 
                        onChange={e => setFormData({ ...formData, name: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email"
                        placeholder="Enter Email" 
                        value={formData.email} 
                        onChange={e => setFormData({ ...formData, email: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="Enter Age" 
                        value={formData.age} 
                        onChange={e => setFormData({ ...formData, age: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        placeholder="Enter Address" 
                        value={formData.address} 
                        onChange={e => setFormData({ ...formData, address: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <div className="d-flex gap-2">
                    <Button variant="success" type="submit">Submit</Button>
                    <Button variant="secondary" onClick={() => navigate('/users')}>Cancel</Button>
                </div>
            </Form>
        </div>
    );
};

export default AddUser;
