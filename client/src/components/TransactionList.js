import React, { useState } from 'react';
import '../styles/TransactionList.scss';

const TransactionList = ({ transactions, onUpdateTransaction, onDeleteTransaction, categories }) => {
    const [editingTransactionId, setEditingTransactionId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const handleEditClick = (transaction) => {
        setEditingTransactionId(transaction._id);
        setEditFormData(transaction);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSaveClick = () => {
        onUpdateTransaction(editingTransactionId, editFormData);
        setEditingTransactionId(null);
    };

    const handleCancelClick = () => {
        setEditingTransactionId(null);
    };

    return (
        <div className="list">
            <h2>Transaction History</h2>
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Transaction Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction._id}>
                            {editingTransactionId === transaction._id ? (
                                <>
                                    <td>
                                        <input
                                            type="date"
                                            name="date"
                                            value={new Date(editFormData.date).toISOString().slice(0, 10)}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="category"
                                            value={editFormData.category}
                                            onChange={handleInputChange}
                                        >
                                            {categories.map(category => (
                                                <option key={category._id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={editFormData.amount}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="description"
                                            value={editFormData.description}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="type"
                                            value={editFormData.type}
                                            onChange={handleInputChange}
                                        >
                                            <option value="paid">Paid</option>
                                            <option value="received">Received</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={handleSaveClick}>Save</button>
                                        <button onClick={handleCancelClick}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.type}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(transaction)}>Edit</button>
                                        <button onClick={() => onDeleteTransaction(transaction._id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;