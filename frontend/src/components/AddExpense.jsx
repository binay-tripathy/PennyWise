import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = ({ onAdd }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsedAmount = parseFloat(amount);

        // Validate inputs
        if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
            console.error('Invalid amount:', amount);
            return;
        }

        if (!description || description.trim() === '') {
            console.error('Invalid description:', description);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/expenses', {
                amount: parsedAmount,
                description,
            });

            onAdd(response.data);
            setAmount('');
            setDescription('');
        } catch (error) {
            console.error('Error adding expense:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default AddExpense;
