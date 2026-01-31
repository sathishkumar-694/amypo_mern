const mongoose = require('mongoose');
const authUserSchema = require('./models/AuthUser');
const userProfileSchema = require('./models/UserProfile');
const productSchema = require('./models/Product');
require('dotenv').config();

// Create connections

const authConn = mongoose.createConnection(process.env.AUTH_DB_URI);
const usersConn = mongoose.createConnection(process.env.USERS_DB_URI);
const productsConn = mongoose.createConnection(process.env.PRODUCTS_DB_URI);

// Check connections
authConn.on('connected', () => console.log('Auth Conn Success'));
usersConn.on('connected', () => console.log('Users Conn Success'));
productsConn.on('connected', () => console.log('Products Conn Success'));

// Create Models on specific connections
const AuthUser = authConn.model('AuthUser', authUserSchema);
const UserProfile = usersConn.model('UserProfile', userProfileSchema);
const Product = productsConn.model('Product', productSchema);

module.exports = {
    AuthUser,
    UserProfile,
    Product
};
