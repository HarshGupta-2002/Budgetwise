import React, { useState } from 'react';
import '../styles/TransactionForm.scss';

const TransactionForm = ({ addTransaction, categories }) => {
    const [formData, setFormData] = useState({
        amount: '',
        date: '',
        category: '',
        description: '',
        type: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction(formData);
        setFormData({
            amount: '',
            date: '',
            category: '',
            description: '',
            type: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Add Transaction</h2>
            <input 
                type="number" 
                name="amount" 
                placeholder="Amount" 
                value={formData.amount} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
            />
            <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required
            >
                <option value="">Select Category</option>
                {categories.map(category => (
                    <option key={category._id} value={category.name}>{category.name}</option>
                ))}
            </select>
            <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange} 
                required
            >
                <option value="">Select Type</option>
                <option value="paid">Paid</option>
                <option value="received">Received</option>
            </select>
            <input 
                type="text" 
                name="description" 
                placeholder="Description" 
                value={formData.description} 
                onChange={handleChange} 
            />
            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default TransactionForm;