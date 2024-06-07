import React, { useState, useEffect } from 'react';
import './Goals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Goals = () => {
  const [dreams, setDreams] = useState('');
  const [goals, setGoals] = useState('');
  const [fiveYearPlan, setFiveYearPlan] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('goalEntries')) || [];
    setEntries(storedEntries);
  }, []);

  const handleDreamsChange = (e) => setDreams(e.target.value);
  const handleGoalsChange = (e) => setGoals(e.target.value);
  const handleFiveYearPlanChange = (e) => setFiveYearPlan(e.target.value);

  const handleSaveEntry = () => {
    const updatedEntries = [...entries, {
      dreams,
      goals,
      fiveYearPlan,
      date: new Date().toLocaleString()
    }];
    setEntries(updatedEntries);
    setDreams('');
    setGoals('');
    setFiveYearPlan('');
    localStorage.setItem('goalEntries', JSON.stringify(updatedEntries));
  };

  const handleClearEntries = () => {
    setEntries([]);
    localStorage.removeItem('goalEntries');
  };

  return (
    <div className="goals-container">
      <header className="goals-header text-center">
        <h1 className="display-3">My Goals and Dreams</h1>
        <p className="lead">Outline your dreams, goals, and 5-year plan</p>
      </header>
      <div className="goals-entry-form">
        <textarea
          className="form-control"
          rows="3"
          value={dreams}
          onChange={handleDreamsChange}
          placeholder="Write your dreams here..."
        />
        <textarea
          className="form-control mt-3"
          rows="3"
          value={goals}
          onChange={handleGoalsChange}
          placeholder="Write your goals here..."
        />
        <textarea
          className="form-control mt-3"
          rows="5"
          value={fiveYearPlan}
          onChange={handleFiveYearPlanChange}
          placeholder="Write your 5-year plan here..."
        />
        <button className="btn btn-primary mt-3" onClick={handleSaveEntry}>Save Entry</button>
        <button className="btn btn-danger mt-3" onClick={handleClearEntries}>Clear All Entries</button>
      </div>
      <div className="goals-entries mt-5">
        {entries.length === 0 && <p>No entries yet. Start writing your first entry!</p>}
        {entries.map((entry, index) => (
          <div className="goals-entry card mb-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">Entry from {entry.date}</h5>
              <p><strong>Dreams:</strong> {entry.dreams}</p>
              <p><strong>Goals:</strong> {entry.goals}</p>
              <p><strong>5-Year Plan:</strong> {entry.fiveYearPlan}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
