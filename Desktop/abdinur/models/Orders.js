const mongoose = require('mongoose')

const OrdersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: 'Uncategorised'
    },
    image: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    }
})
const Orders = mongoose.model('Orders', OrdersSchema)

module.exports = Orders;