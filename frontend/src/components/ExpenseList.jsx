import React from 'react';
import axios from 'axios';

const ExpenseList = ({ expenses, onDelete }) => {
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/expenses/${id}`);
            onDelete(id); // Call the delete handler passed from the App component
        } catch (error) {
            console.error('Error deleting expense:', JSON.stringify(error, null, 2)); // Log the error object
            res.status(500).json({ message: 'Error deleting expense', error: error.message });
        }
    };

    return (
        <div>
            <h2>Expense List</h2>
            {expenses.length === 0 ? (
                <p>No expenses recorded</p>
            ) : (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense._id}>
                            {expense.description}: ${expense.amount.toFixed(2)}{' '}
                            <button onClick={() => onDelete(expense._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpenseList;
