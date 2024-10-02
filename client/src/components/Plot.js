import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Plot = ({ transactions }) => {
    const [mergedView, setMergedView] = useState(true); // Toggle between merged or separate plots

    // Prepare datasets for "paid" and "received" transactions
    const prepareChartData = (category = null) => {
        const filteredTransactions = category
            ? transactions.filter(t => t.category === category)
            : transactions;

        const dates = filteredTransactions.map(t => new Date(t.date).toLocaleDateString());
        const paidAmounts = filteredTransactions.map(t => (t.type === 'paid' ? t.amount : 0));
        const receivedAmounts = filteredTransactions.map(t => (t.type === 'received' ? t.amount : 0));

        return {
            labels: dates,
            datasets: [
                {
                    label: 'Paid',
                    data: paidAmounts,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Received',
                    data: receivedAmounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    tension: 0.4
                }
            ]
        };
    };

    // Prepare data for Pie chart (Paid vs Received)
    const typeTotals = transactions.reduce(
        (totals, t) => {
            if (t.type === 'paid') {
                totals.paid.count += 1;
                totals.paid.amount += t.amount;
            } else if (t.type === 'received') {
                totals.received.count += 1;
                totals.received.amount += t.amount;
            }
            return totals;
        },
        { paid: { count: 0, amount: 0 }, received: { count: 0, amount: 0 } }
    );

    const typeData = {
        labels: [
            `Paid (${typeTotals.paid.count} transactions - ₹${typeTotals.paid.amount})`,
            `Received (${typeTotals.received.count} transactions - ₹${typeTotals.received.amount})`
        ],
        datasets: [
            {
                label: 'Transaction Distribution',
                data: [typeTotals.paid.count, typeTotals.received.count],
                backgroundColor: ['#ff6384', '#36a2eb'],
                hoverBackgroundColor: ['#ff6384', '#36a2eb']
            }
        ]
    };

    // Prepare data for Pie chart (Transactions per Category)
    const categoryTotals = transactions.reduce((totals, t) => {
        totals[t.category] = totals[t.category] || { count: 0, amount: 0 };
        totals[t.category].count += 1;
        totals[t.category].amount += t.amount;
        return totals;
    }, {});

    const categoryLabels = Object.keys(categoryTotals).map(category => {
        const { count, amount } = categoryTotals[category];
        return `${category} (${count} transactions - ₹${amount})`;
    });

    const categoryData = {
        labels: categoryLabels,
        datasets: [
            {
                label: 'Transactions per Category',
                data: Object.values(categoryTotals).map(c => c.count),
                backgroundColor: ['#ffcd56', '#4bc0c0', '#36a2eb', '#9966ff', '#ff6384'],
                hoverBackgroundColor: ['#ffcd56', '#4bc0c0', '#36a2eb', '#9966ff', '#ff6384']
            }
        ]
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: mergedView ? 'Merged Transactions' : 'Category-wise Transactions' }
        },
        scales: {
            x: { title: { display: true, text: 'Date' } },
            y: { title: { display: true, text: 'Amount' }, beginAtZero: true }
        }
    };

    // Get unique categories for plotting separate graphs
    const categories = [...new Set(transactions.map(t => t.category))];

    return (
        <div>
            <h2>Transaction Graphs</h2>
            <div className='toggle-buttons'>
                <button onClick={() => setMergedView(!mergedView)}>
                    {mergedView ? 'Category Plots' : 'Merged Plot'}
                </button>
            </div>

            <div className='line-plot'>
                {mergedView ? (
                    // Single merged plot
                    <Line data={prepareChartData()} options={chartOptions} />
                ) : (
                    // Separate plots for each category
                    categories.map(category => (
                        <div key={category}>
                            <h4>{category}</h4>
                            <Line data={prepareChartData(category)} options={chartOptions} />
                        </div>
                    ))
                )}
            </div>

            <div className='pie'>
                <div className="pie-chart">
                    <h4>Paid vs Received Transactions</h4>
                    <Pie data={typeData} />
                </div>

                <div className="pie-chart">
                    <h4>Transactions per Category</h4>
                    <Pie data={categoryData} />
                </div>
            </div>

        </div>
    );
};

export default Plot;