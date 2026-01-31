import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
    };

    return (
        <div className="w-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Products List</h2>
                <Button variant="primary" onClick={() => navigate('/products/add')}>
                    Add Product
                </Button>
            </div>

            <Table bordered className="mt-2">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p._id}>
                            <td>{p.name}</td>
                            <td>${p.price}</td>
                            <td>{p.description}</td>
                            <td>{p.category}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Products;
