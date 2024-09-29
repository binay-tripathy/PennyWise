import React, { useEffect, useState } from 'react';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import 'react-datepicker/dist/react-datepicker.css';

const App = () => {
    const [expenses, setExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);

    const handleAdd = (newExpense) => {
        setExpenses((prev) => [...prev, newExpense]);
        updateTotalExpense([...expenses, newExpense]);
    };

    const handleDelete = (id) => {
        const updatedExpenses = expenses.filter((expense) => expense._id !== id);
        setExpenses(updatedExpenses);
        updateTotalExpense(updatedExpenses);
    };

    const updateTotalExpense = (updatedExpenses) => {
        const total = updatedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalExpense(total);
    };

    useEffect(() => {
        // Initial calculation if needed
        updateTotalExpense(expenses);
    }, [expenses]);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Expense Tracker</h1>
            <AddExpense onAdd={handleAdd} />
            <ExpenseList expenses={expenses} onDelete={handleDelete} />
            <h2>Total Expense: ${totalExpense.toFixed(2)}</h2>
        </div>
    );
};

export default App;
