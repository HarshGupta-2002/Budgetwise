import React, { useState, useEffect } from 'react';
import '../styles/TransactionList.scss';
import * as XLSX from 'xlsx';

const TransactionList = ({ transactions, onUpdateTransaction, onDeleteTransaction, categories }) => {
    const [editingTransactionId, setEditingTransactionId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [totals, setTotals] = useState({ earnings: 0, expenses: 0, savings: 0 });

    useEffect(() => {
        const earnings = transactions
            .filter(transaction => transaction.type === 'received')
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        const expenses = transactions
            .filter(transaction => transaction.type === 'paid')
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        const savings = earnings - expenses;

        setTotals({ earnings, expenses, savings });
    }, [transactions]);

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

    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(transactions);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Transactions");
        XLSX.writeFile(wb, "transaction_history.xlsx");
    };

    return (
        <div className="list">
            <h2>Transaction History</h2>
            <div className="totals">
                <h3>Total Earnings: <span style={{ color: 'blue' }}>{totals.earnings} INR</span></h3>
                <h3>Total Expenses: <span style={{ color: 'blue' }}>{totals.expenses} INR</span></h3>
                <h3>
                    Total Savings:
                    <span style={{ color: totals.savings < 0 ? 'red' : 'blue' }}>
                        {totals.savings} INR
                    </span>
                    {totals.savings < 0 && <span> (debt)</span>}
                </h3>
            </div>

            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount (INR)</th>
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
            <div className='download'>
                <button onClick={downloadExcel}>Download Excel</button>
            </div>

        </div>
    );
};

export default TransactionList;