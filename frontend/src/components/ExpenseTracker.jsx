import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddExpense from './AddExpense';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/expenses');
                setExpenses(response.data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    const handleAddExpense = (newExpense) => {
        setExpenses((prev) => [...prev, newExpense]);
    };

    const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

    return (
        <div>
            <h1>All Expenses</h1>
            <AddExpense onAdd={handleAddExpense} />
            <ul>
                {expenses.map((expense) => (
                    <li key={expense._id}>
                        {expense.description} - ${expense.amount}
                    </li>
                ))}
            </ul>
            <h2>Total: ${totalExpense}</h2>
        </div>
    );
};

export default ExpenseTracker;
