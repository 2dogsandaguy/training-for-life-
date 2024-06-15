import React, { useState, useEffect } from 'react';
import './Bills.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation, useQuery } from '@apollo/client';
import { SET_BILL, DELETE_BILL } from '../../utils/mutations';
import { GET_BILLS } from '../../utils/queries';

const Bills = () => {
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [amount, setAmount] = useState('');
  const { loading, data, refetch } = useQuery(GET_BILLS);
  const [setBill] = useMutation(SET_BILL);
  const [deleteBill] = useMutation(DELETE_BILL);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== 'Other') {
      setCustomCategory('');
    }
  };
  const handleCustomCategoryChange = (e) => setCustomCategory(e.target.value);
  const handleAmountChange = (e) => setAmount(parseFloat(e.target.value));

  const handleSaveEntry = async () => {
    const billDate = new Date().toISOString();
    try {
      const { data: newData } = await setBill({
        variables: {
          category,
          customCategory,
          amount,
          date: billDate,
        },
      });

      await refetch(); // Ensure the latest data is fetched
      setCategory('');
      setCustomCategory('');
      setAmount('');
    } catch (error) {
      console.error("Error saving bill entry:", error);
    }
  };

  const handleDeleteEntry = async (billId) => {
    try {
      await deleteBill({ variables: { billId } });
      await refetch(); // Ensure the latest data is fetched
    } catch (error) {
      console.error("Error deleting bill entry:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  const bills = data?.me?.bills || [];

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
      </div>
      <div className="bills-entries mt-5">
        {bills.length === 0 && <p>No entries yet. Start adding your bills!</p>}
        {bills.map((bill) => (
          <div className="bills-entry card mb-3" key={bill._id}>
            <div className="card-body">
              <h5 className="card-title">Entry from {new Date(bill.date).toLocaleString()}</h5>
              <p><strong>Category:</strong> {bill.category}</p>
              <p><strong>Amount:</strong> ${bill.amount}</p>
              <button className="btn btn-danger mt-3" onClick={() => handleDeleteEntry(bill._id)}>Delete Entry</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bills;
