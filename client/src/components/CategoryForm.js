import React, { useState } from 'react';
import '../App.scss';

const CategoryForm = ({ addCategory }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addCategory({ name });
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Add Category</h2>
            <input 
                type="text" 
                placeholder="Category Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            <button type="submit">Add Category</button>
        </form>
    );
};

export default CategoryForm;