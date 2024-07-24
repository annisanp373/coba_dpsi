const express = require('express');
const router = express.Router();
const { Stakeholder } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

// Prioritize stakeholders
router.post('/prioritize', [authenticate, authorize(['project_manager'])], async (req, res) => {
    try {
        const { influenceThreshold, interestThreshold } = req.body;
        
        const stakeholders = await Stakeholder.findAll({
            where: {
                influence: { [Op.gte]: influenceThreshold },
                interest: { [Op.gte]: interestThreshold }
            }
        });

        stakeholders.sort((a, b) => (b.influence + b.interest) - (a.influence + a.interest));

        res.json(stakeholders);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
