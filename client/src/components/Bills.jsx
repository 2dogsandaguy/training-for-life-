import React, { useState, useEffect } from 'react';
import './Bills.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Bills = () => {
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const storedBills = JSON.parse(localStorage.getItem('billEntries')) || [];
    setBills(storedBills);
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== 'Other') {
      setCustomCategory('');
    }
  };
  const handleCustomCategoryChange = (e) => setCustomCategory(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  const handleSaveEntry = () => {
    const billCategory = category === 'Other' ? customCategory : category;
    const updatedBills = [...bills, {
      category: billCategory,
      amount,
      date: new Date().toLocaleString()
    }];
    setBills(updatedBills);
    setCategory('');
    setCustomCategory('');
    setAmount('');
    localStorage.setItem('billEntries', JSON.stringify(updatedBills));
  };

  const handleClearEntries = () => {
    setBills([]);
    localStorage.removeItem('billEntries');
  };

  return (
    <div className="bills-container">
      <header className="bills-header text-center">
        <h1 className="display-3">Bill Tracker</h1>
        <p className="lead">Keep track of your bills and categorize them</p>
      </header>
      <div className="bills-entry-form">
        <select className="form-control" value={category} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          <option value="Rent">Rent</option>
          <option value="Utilities">Utilities</option>
          <option value="Groceries">Groceries</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        {category === 'Other' && (
          <input
            type="text"
            className="form-control mt-3"
            value={customCategory}
            onChange={handleCustomCategoryChange}
            placeholder="Enter custom category"
          />
        )}
        <input
          type="number"
          className="form-control mt-3"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
        />
        <button className="btn btn-primary mt-3" onClick={handleSaveEntry}>Save Entry</button>
        <button className="btn btn-danger mt-3" onClick={handleClearEntries}>Clear All Entries</button>
      </div>
      <div className="bills-entries mt-5">
        {bills.length === 0 && <p>No entries yet. Start adding your bills!</p>}
        {bills.map((bill, index) => (
          <div className="bills-entry card mb-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">Entry from {bill.date}</h5>
              <p><strong>Category:</strong> {bill.category}</p>
              <p><strong>Amount:</strong> ${bill.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bills;
