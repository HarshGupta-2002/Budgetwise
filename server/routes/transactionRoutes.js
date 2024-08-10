const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getTransactions, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction 
} = require('../controllers/transactionController');

// Get all transactions for a user
router.get('/', protect, getTransactions);

// Add a new transaction
router.post('/', protect, addTransaction);

// Update an existing transaction
router.put('/:id', protect, updateTransaction);

// Delete a transaction
router.delete('/:id', protect, deleteTransaction);

module.exports = router;