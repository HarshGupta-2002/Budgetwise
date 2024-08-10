const Category = require('../models/Category');

// Get all categories for a user
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new category
const addCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const category = new Category({
            user: req.user.id,
            name,
        });

        const createdCategory = await category.save();
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing category
const updateCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const category = await Category.findById(req.params.id);

        if (category.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        category.name = name || category.name;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (category.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Delete the category
        await Category.deleteOne({ _id: req.params.id });

        res.json({ message: 'Category removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
};