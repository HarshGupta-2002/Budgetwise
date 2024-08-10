import React from 'react';
import '../styles/CategoryList.scss';

const CategoryList = ({ categories, onDeleteCategory }) => {
    return (
        <div className="list">
            <h2>Categories</h2>
            <div className="category-container">
                {categories.map(category => (
                    <div key={category._id} className="category-box">
                        <span>{category.name}</span>
                        <button className="delete-button" onClick={() => onDeleteCategory(category._id)}>x</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;