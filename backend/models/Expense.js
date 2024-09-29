const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
