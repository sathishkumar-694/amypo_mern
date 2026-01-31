const express = require('express');
const router = express.Router();
const { Product } = require('../db');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a product
router.post('/', async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const newProduct = new Product({ name, price, description, category });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
