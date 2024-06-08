import React, { useState, useEffect } from 'react';
import './Investment.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Investment = () => {
  const [investmentType, setInvestmentType] = useState('');
  const [investmentUrl, setInvestmentUrl] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const storedInvestments = JSON.parse(localStorage.getItem('investments')) || [];
    setInvestments(storedInvestments);
  }, []);

  const handleTypeChange = (e) => setInvestmentType(e.target.value);
  const handleUrlChange = (e) => setInvestmentUrl(e.target.value);
  const handleAmountChange = (e) => setInvestmentAmount(e.target.value);

  const handleSaveInvestment = () => {
    const newInvestment = {
      type: investmentType,
      url: investmentUrl,
      amount: investmentAmount,
      date: new Date().toLocaleString()
    };
    const updatedInvestments = [...investments, newInvestment];
    setInvestments(updatedInvestments);
    setInvestmentType('');
    setInvestmentUrl('');
    setInvestmentAmount('');
    localStorage.setItem('investments', JSON.stringify(updatedInvestments));
  };

  const handleClearInvestments = () => {
    setInvestments([]);
    localStorage.removeItem('investments');
  };

  return (
    <div className="investment-container">
      <header className="investment-header text-center">
        <h1 className="display-3">Investment Tracker</h1>
        <p className="lead">Track your investments and their details</p>
      </header>
      <div className="investment-entry-form">
        <input
          type="text"
          className="form-control"
          value={investmentType}
          onChange={handleTypeChange}
          placeholder="Investment Type"
        />
        <input
          type="url"
          className="form-control mt-3"
          value={investmentUrl}
          onChange={handleUrlChange}
          placeholder="Investment URL"
        />
        <input
          type="number"
          className="form-control mt-3"
          value={investmentAmount}
          onChange={handleAmountChange}
          placeholder="Investment Amount"
        />
        <button className="btn btn-primary mt-3" onClick={handleSaveInvestment}>Save Investment</button>
        <button className="btn btn-danger mt-3" onClick={handleClearInvestments}>Clear All Investments</button>
      </div>
      <div className="investment-entries mt-5">
        {investments.length === 0 && <p>No investments yet. Start adding your investments!</p>}
        {investments.map((investment, index) => (
          <div className="investment-entry card mb-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">Entry from {investment.date}</h5>
              <p><strong>Type:</strong> {investment.type}</p>
              <p><strong>Amount:</strong> ${investment.amount}</p>
              <p><strong>URL:</strong> <a href={investment.url} target="_blank" rel="noopener noreferrer">{investment.url}</a></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Investment;
