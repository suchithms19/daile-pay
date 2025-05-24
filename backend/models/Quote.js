const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    company: {
        type: String
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    productType: {
        type: String,
        required: [true, 'Product type is required'],
        enum: ['wooden-pallets', 'plastic-pallets', 'wooden-crates', 'plastic-crates', 'plastic-boxes']
    },
    size: {
        type: String,
        required: [true, 'Size is required']
    },
    height: {
        type: String,
        required: [true, 'Height is required']
    },
    palletType: {
        way2: {
            type: Boolean,
            default: false
        },
        way4: {
            type: Boolean,
            default: false
        },
        reversible: {
            type: Boolean,
            default: false
        }
    },
    requiredFor: {
        warehouse: {
            type: Boolean,
            default: false
        },
        shipment: {
            type: Boolean,
            default: false
        },
        logistics: {
            type: Boolean,
            default: false
        }
    },
    additionalMessage: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Quote', quoteSchema); 