const Transaction = require('../models/Transaction');

// Get all transactions for a user
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new transaction
const addTransaction = async (req, res) => {
    const { amount, date, category, description, type } = req.body;

    try {
        const transaction = new Transaction({
            user: req.user.id,
            amount,
            date,
            category,
            description,
            type,
        });

        const createdTransaction = await transaction.save();
        res.status(201).json(createdTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing transaction
const updateTransaction = async (req, res) => {
    const { amount, date, category, description, type } = req.body;

    try {
        const transaction = await Transaction.findById(req.params.id);

        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        transaction.amount = amount || transaction.amount;
        transaction.date = date || transaction.date;
        transaction.category = category || transaction.category;
        transaction.description = description || transaction.description;
        transaction.type = type || transaction.type;

        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await transaction.deleteOne({ _id: req.params._id });
        res.json({ message: 'Transaction removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
};