import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { SET_INVESTMENT, DELETE_INVESTMENT } from '../../utils/mutations';
import './Investment.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Investment = () => {
  const [investmentType, setInvestmentType] = useState('');
  const [investmentUrl, setInvestmentUrl] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const { loading, error, data } = useQuery(GET_ME);
  const [setInvestment] = useMutation(SET_INVESTMENT);
  const [deleteInvestment] = useMutation(DELETE_INVESTMENT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading investments: {error.message}</p>;

  const investments = data?.me?.investments || [];

  const handleTypeChange = (e) => setInvestmentType(e.target.value);
  const handleUrlChange = (e) => setInvestmentUrl(e.target.value);
  const handleAmountChange = (e) => setInvestmentAmount(e.target.value);

  const handleSaveInvestment = async () => {
    try {
      await setInvestment({
        variables: {
          type: investmentType,
          url: investmentUrl,
          amount: investmentAmount,
          date: new Date().toLocaleString(),
        },
      });
      setInvestmentType('');
      setInvestmentUrl('');
      setInvestmentAmount('');
      // Refetch the GET_ME query to update the list of investments
      await refetch();
    } catch (err) {
      console.error('Error saving investment entry:', err);
    }
  };

  const handleDeleteInvestment = async (id) => {
    try {
      await deleteInvestment({
        variables: { investmentId: id },
      });
      // Refetch the GET_ME query to update the list of investments
      await refetch();
    } catch (err) {
      console.error('Error deleting investment entry:', err);
    }
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
      </div>
      <div className="investment-entries mt-5">
        {investments.length === 0 && <p>No investments yet. Start adding your investments!</p>}
        {investments.map((investment) => (
          <div className="investment-entry card mb-3" key={investment._id}>
            <div className="card-body">
              <h5 className="card-title">Entry from {investment.date}</h5>
              <p><strong>Type:</strong> {investment.type}</p>
              <p><strong>Amount:</strong> ${investment.amount}</p>
              <p><strong>URL:</strong> <a href={investment.url} target="_blank" rel="noopener noreferrer">{investment.url}</a></p>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteInvestment(investment._id)}
              >
                Delete Investment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Investment;
