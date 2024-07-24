const express = require('express');
const router = express.Router();
const { Requirement } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

// Collect requirements automatically
router.post('/collect', [authenticate, authorize(['business_analyst'])], async (req, res) => {
    try {
        const { dataSource } = req.body;
        
        // Simulate data collection from an external source
        const requirements = await collectRequirementsFromSource(dataSource);

        for (const req of requirements) {
            await Requirement.create(req);
        }

        res.status(201).json(requirements);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

async function collectRequirementsFromSource(source) {
    // Implement the logic to collect requirements from the data source
    return [
        { description: 'Requirement 1', priority: 1 },
        { description: 'Requirement 2', priority: 2 }
    ];
}

module.exports = router;
