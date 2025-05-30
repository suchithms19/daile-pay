const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Pickup = require('../models/PickUp');

// Validation middleware
const validatepickUp = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('company').optional().trim(),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('productType').optional().isIn(['wooden-pallets', 'plastic-pallets', 'wooden-crates', 'plastic-crates', 'plastic-boxes'])
        .withMessage('Invalid product type'),
    body('message').trim().notEmpty().withMessage('Message is required'),
];

// POST /api/pickup/request
router.post('/request', validatepickUp, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // Create new pickup
        const pickup = new Pickup({
            name: req.body.name,
            company: req.body.company,
            email: req.body.email,
            phone: req.body.phone,
            productType: req.body.productType,
            message: req.body.message
        });

        // Save pickup to database
        await pickup.save();

        res.status(200).json({
            success: true,
            message: 'pickup request sent successfully!',
            data: pickup
        });

    } catch (error) {
        console.error('error in pickup request', error);
        res.status(500).json({
            success: false,
            message: 'Somethin went wrong. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
module.exports = router; 