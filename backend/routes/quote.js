const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Quote = require('../models/Quote');

// Validation middleware
const validateQuote = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('productType').trim().notEmpty().withMessage('Product type is required')
        .isIn(['wooden-pallets', 'plastic-pallets', 'wooden-crates', 'plastic-crates', 'plastic-boxes'])
        .withMessage('Invalid product type'),
    body('size').trim().notEmpty().withMessage('Size is required'),
    body('height').trim().notEmpty().withMessage('Height is required'),
    body('requiredFor').custom((value) => {
        if (!value || (!value.warehouse && !value.shipment && !value.logistics)) {
            throw new Error('Please select at least one option for Required For');
        }
        return true;
    }),
    body('company').optional().trim(),
    body('palletType.way2').optional().isBoolean(),
    body('palletType.way4').optional().isBoolean(),
    body('palletType.reversible').optional().isBoolean(),
    body('additionalMessage').optional().trim()
];

// POST /api/quote - Submit a new quote request
router.post('/', validateQuote, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // Create new quote
        const quote = new Quote({
            name: req.body.name,
            company: req.body.company,
            phone: req.body.phone,
            email: req.body.email,
            productType: req.body.productType,
            size: req.body.size,
            height: req.body.height,
            palletType: {
                way2: req.body.palletType?.way2 || false,
                way4: req.body.palletType?.way4 || false,
                reversible: req.body.palletType?.reversible || false
            },
            requiredFor: {
                warehouse: req.body.requiredFor?.warehouse || false,
                shipment: req.body.requiredFor?.shipment || false,
                logistics: req.body.requiredFor?.logistics || false
            },
            additionalMessage: req.body.additionalMessage
        });

        // Save quote to database
        await quote.save();

        res.status(201).json({
            success: true,
            message: 'Thank you for your quote request! We will contact you shortly with pricing details.',
            data: quote
        });

    } catch (error) {
        console.error('Quote submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit quote request. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// GET /api/quote - Get all quotes (for admin purposes)
router.get('/', async (req, res) => {
    try {
        const quotes = await Quote.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: quotes
        });
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch quotes',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// PUT /api/quote/:id/status - Update quote status (for admin purposes)
router.put('/:id/status', [
    body('status').isIn(['pending', 'processing', 'completed', 'rejected']).withMessage('Invalid status')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const quote = await Quote.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!quote) {
            return res.status(404).json({
                success: false,
                message: 'Quote not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Quote status updated successfully',
            data: quote
        });

    } catch (error) {
        console.error('Error updating quote status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update quote status',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router; 