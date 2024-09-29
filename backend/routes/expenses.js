const express = require('express');
const mongoose = require('mongoose');
const Expense = require('../models/Expense'); // Adjust the path as necessary
const router = express.Router();


// Create an expense
router.post('/', async (req, res) => {
    const { amount, description } = req.body;

    // Validate input
    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount. It must be a positive number.' });
    }

    if (!description || typeof description !== 'string') {
        return res.status(400).json({ message: 'Invalid description. It cannot be empty.' });
    }

    try {
        const newExpense = new Expense({ amount, description });
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Error adding expense', error: error.message });
    }
});


// Get all expenses or filter by date
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving expenses', error });
    }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        console.log('Attempting to delete expense with ID:', id);
        const result = await Expense.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting expense', error: error.message });
    }
});


module.exports = router;
