import React, { useState, useEffect } from 'react';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../api/transactionApi';
import { getCategories, addCategory, deleteCategory } from '../api/categoryApi';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { useNavigate } from 'react-router-dom';
import '../App.scss';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showTransactionForm, setShowTransactionForm] = useState(false); // State to toggle between form and list
    const [showCategoryForm, setShowCategoryForm] = useState(false); // State to toggle category form
    const navigate = useNavigate();
    const [name, setUserName] = useState(''); // State to store user name

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if user is logged in
                const token = localStorage.getItem('token');
                const name = localStorage.getItem('name');

                if (!token || !name) {
                    // If no token or name, redirect to login
                    navigate('/');
                    return;
                }

                // Fetch data only if user is authenticated
                const transactionsData = await getTransactions();
                setTransactions(transactionsData.data);
                const categoriesData = await getCategories();
                setCategories(categoriesData.data);
                setUserName(name);
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/');
            }
        };
        fetchData();
    }, [navigate]);

    const handleAddTransaction = async (transaction) => {
        try {
            const newTransaction = await addTransaction(transaction);
            setTransactions([newTransaction.data, ...transactions]);
            setShowTransactionForm(false); // Switch back to list after adding transaction
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    const handleUpdateTransaction = async (id, updatedTransaction) => {
        try {
            const updated = await updateTransaction(id, updatedTransaction);
            setTransactions(transactions.map(t => (t._id === id ? updated.data : t)));
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    const handleDeleteTransaction = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction from history?')) {
            try {
                await deleteTransaction(id);
                setTransactions(transactions.filter(t => t._id !== id));
            } catch (error) {
                console.error('Error deleting transaction:', error);
            }
        }
    };

    const handleAddCategory = async (category) => {
        try {
            const newCategory = await addCategory(category);
            setCategories([newCategory.data, ...categories]);
            setShowCategoryForm(false);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(id);
                setCategories(categories.filter(c => c._id !== id));
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/');
    };

    return (
        <div className="dashboard">
            <div className='navbar'>
                <h2>{name ? `Welcome, ${name}` : 'Dashboard'}</h2>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>

            <div className='transactions'>
                <div className="toggle-buttons">
                    <button onClick={() => setShowTransactionForm(false)} className={showTransactionForm ? '' : 'active'}>
                        View Transactions
                    </button>
                    <button onClick={() => setShowTransactionForm(true)} className={showTransactionForm ? 'active' : ''}>
                        Add Transaction
                    </button>
                </div>
                <div className="content">
                    {showTransactionForm ? (
                        <TransactionForm addTransaction={handleAddTransaction} categories={categories} />
                    ) : (
                        <TransactionList
                            transactions={transactions}
                            categories={categories}
                            onUpdateTransaction={handleUpdateTransaction}
                            onDeleteTransaction={handleDeleteTransaction}
                        />
                    )}
                </div>
            </div>


            <div className='categories'>
                <div className="toggle-buttons">
                    <button onClick={() => setShowCategoryForm(false)} className={showCategoryForm ? '' : 'active'}>
                        View Categories
                    </button>
                    <button onClick={() => setShowCategoryForm(true)} className={showCategoryForm ? 'active' : ''}>
                        Add Category
                    </button>
                </div>
                <div className="content">
                    {showCategoryForm ? (
                        <CategoryForm addCategory={handleAddCategory} />
                    ) : (
                        <CategoryList categories={categories} onDeleteCategory={handleDeleteCategory} />

                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;