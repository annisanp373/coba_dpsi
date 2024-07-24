const express = require('express');
const router = express.Router();
const { Stakeholder } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

// Get all stakeholders
router.get('/', [authenticate, authorize(['project_manager'])], async (req, res) => {
    try {
        const stakeholders = await Stakeholder.findAll();
        res.json(stakeholders);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Add a new stakeholder
router.post('/', [authenticate, authorize(['project_manager'])], async (req, res) => {
    try {
        const stakeholder = await Stakeholder.create(req.body);
        res.status(201).json(stakeholder);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update a stakeholder
router.put('/:id', [authenticate, authorize(['project_manager'])], async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Stakeholder.update(req.body, { where: { id } });
        if (updated) {
            const updatedStakeholder = await Stakeholder.findByPk(id);
            res.status(200).json(updatedStakeholder);
        } else {
            res.status(404).json({ message: 'Stakeholder not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Delete a stakeholder
router.delete('/:id', [authenticate, authorize(['project_manager'])], async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Stakeholder.destroy({ where: { id } });
        if (deleted) {
            res.status(204).json({ message: 'Stakeholder deleted successfully' });
        } else {
            res.status(404).json({ message: 'Stakeholder not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
