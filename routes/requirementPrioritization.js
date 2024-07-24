const express = require('express');
const router = express.Router();
const { Requirement } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

// Prioritize requirements
router.post('/prioritize', [authenticate, authorize(['developer'])], async (req, res) => {
    try {
        const { criteria } = req.body;
        
        const requirements = await Requirement.findAll();
        
        requirements.sort((a, b) => b.priority - a.priority);

        res.json(requirements);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
