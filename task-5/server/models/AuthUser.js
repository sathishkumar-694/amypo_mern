const mongoose = require('mongoose');
const { Schema } = mongoose;

const authUserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = authUserSchema;
