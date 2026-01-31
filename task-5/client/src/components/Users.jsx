import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
    };

    return (
        <div className="w-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Users List</h2>
                <Button variant="primary" onClick={() => navigate('/users/add')}>
                    Add User
                </Button>
            </div>

            <Table bordered className="mt-2">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.age}</td>
                            <td>{u.address}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Users;