const express = require('express');
const router = express.Router();
const { Requirement } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

// Get all requirements
router.get('/', [authenticate, authorize(['business_analyst', 'developer'])], async (req, res) => {
    try {
        const requirements = await Requirement.findAll();
        res.json(requirements);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Add a new requirement
router.post('/', [authenticate, authorize(['business_analyst'])], async (req, res) => {
    try {
        const requirement = await Requirement.create(req.body);
        res.status(201).json(requirement);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update a requirement
router.put('/:id', [authenticate, authorize(['business_analyst'])], async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Requirement.update(req.body, { where: { id } });
        if (updated) {
            const updatedRequirement = await Requirement.findByPk(id);
            res.status(200).json(updatedRequirement);
        } else {
            res.status(404).json({ message: 'Requirement not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Delete a requirement
router.delete('/:id', [authenticate, authorize(['business_analyst'])], async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Requirement.destroy({ where: { id } });
        if (deleted) {
            res.status(204).json({ message: 'Requirement deleted successfully' });
        } else {
            res.status(404).json({ message: 'Requirement not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
