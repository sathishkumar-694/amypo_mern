import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [formData, setFormData] = useState({ name: '', price: '', description: '', category: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/products', formData);
        navigate('/products');
    };

    return (
        <div className="w-100 p-3">
            <h2>Add Product</h2>
            <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        placeholder="Enter Product Name" 
                        value={formData.name} 
                        onChange={e => setFormData({ ...formData, name: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="Enter Price" 
                        value={formData.price} 
                        onChange={e => setFormData({ ...formData, price: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        placeholder="Enter Description" 
                        value={formData.description} 
                        onChange={e => setFormData({ ...formData, description: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control 
                        placeholder="Enter Category" 
                        value={formData.category} 
                        onChange={e => setFormData({ ...formData, category: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <div className="d-flex gap-2">
                    <Button variant="success" type="submit">Submit</Button>
                    <Button variant="secondary" onClick={() => navigate('/products')}>Cancel</Button>
                </div>
            </Form>
        </div>
    );
};

export default AddProduct;
