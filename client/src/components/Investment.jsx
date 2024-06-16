import React, { useState, useEffect } from 'react';
import './Investment.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation, useQuery } from '@apollo/client';
import { SET_INVESTMENT, DELETE_INVESTMENT } from '../../utils/mutations';
import { GET_ME } from '../../utils/queries';
import AuthService from '../../utils/auth';

const Investment = () => {
  const [investmentType, setInvestmentType] = useState('');
  const [investmentUrl, setInvestmentUrl] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investments, setInvestments] = useState([]);
  const { loading, data, refetch } = useQuery(GET_ME);
  const [setInvestment] = useMutation(SET_INVESTMENT);
  const [deleteInvestment] = useMutation(DELETE_INVESTMENT);

  useEffect(() => {
    if (data && data.me && data.me.investments) {
      setInvestments(data.me.investments);
    }
  }, [data]);

  const handleTypeChange = (e) => setInvestmentType(e.target.value);
  const handleUrlChange = (e) => setInvestmentUrl(e.target.value);
  const handleAmountChange = (e) => setInvestmentAmount(e.target.value);

  const handleSaveInvestment = async () => {
    const date = new Date().toISOString();
    try {
      const { data: newData } = await setInvestment({
        variables: {
          type: investmentType,
          url: investmentUrl,
          amount: parseFloat(investmentAmount),
          date: date,
        },
      });

      const newInvestment = newData.setInvestment;
      const updatedInvestments = [...investments, newInvestment];
      setInvestments(updatedInvestments);
      setInvestmentType('');
      setInvestmentUrl('');
      setInvestmentAmount('');
      refetch();  // Fetch updated entries
    } catch (error) {
      console.error("Error saving investment entry:", error);
    }
  };

  const handleDeleteInvestment = async (investmentId) => {
    try {
      await deleteInvestment({ variables: { investmentId } });
      const updatedInvestments = investments.filter(investment => investment._id !== investmentId);
      setInvestments(updatedInvestments);
      refetch();  // Fetch updated entries
    } catch (error) {
      console.error("Error deleting investment entry:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

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
        <button className="btn btn-danger mt-3" onClick={() => handleClearInvestments()}>Clear All Investments</button>
      </div>
      <div className="investment-entries mt-5">
        {investments.length === 0 && <p>No investments yet. Start adding your investments!</p>}
        {investments.map((investment) => (
          <div className="investment-entry card mb-3" key={investment._id}>
            <div className="card-body">
              <h5 className="card-title">Entry from {new Date(investment.date).toLocaleString()}</h5>
              <p><strong>Type:</strong> {investment.type}</p>
              <p><strong>Amount:</strong> ${investment.amount}</p>
              <p><strong>URL:</strong> <a href={investment.url} target="_blank" rel="noopener noreferrer">{investment.url}</a></p>
              <button className="btn btn-danger" onClick={() => handleDeleteInvestment(investment._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Investment;
