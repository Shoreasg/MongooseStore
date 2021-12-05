const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: { type: String },
    img: { type: String },
    price: { type: Number, min: 0 },
    qty: { type: Number, min: 0 }


}, { timestamps: { createdAt: "created_at" } })

module.exports = mongoose.model('Products', productSchema)