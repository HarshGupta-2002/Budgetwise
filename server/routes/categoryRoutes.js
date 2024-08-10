const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getCategories, 
    addCategory, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/categoryController');

// Get all categories for a user
router.get('/', protect, getCategories);

// Add a new category
router.post('/', protect, addCategory);

// Update an existing category
router.put('/:id', protect, updateCategory);

// Delete a category
router.delete('/:id', protect, deleteCategory);

module.exports = router;