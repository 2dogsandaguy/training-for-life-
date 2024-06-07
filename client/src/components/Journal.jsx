import React, { useState, useEffect } from 'react';
import './Journal.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setEntries(storedEntries);
  }, []);

  const handleEntryChange = (e) => {
    setNewEntry(e.target.value);
  };

  const handleSaveEntry = () => {
    const updatedEntries = [...entries, { text: newEntry, date: new Date().toLocaleString() }];
    setEntries(updatedEntries);
    setNewEntry('');
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  const handleClearEntries = () => {
    setEntries([]);
    localStorage.removeItem('journalEntries');
  };

  return (
    <div className="journal-container">
      <header className="journal-header text-center">
        <h1 className="display-3">My Awesome Journal</h1>
        <p className="lead">Capture your thoughts and ideas</p>
      </header>
      <div className="journal-entry-form">
        <textarea
          className="form-control"
          rows="5"
          value={newEntry}
          onChange={handleEntryChange}
          placeholder="Write your journal entry here..."
        />
        <button className="btn btn-primary mt-3" onClick={handleSaveEntry}>Save Entry</button>
        <button className="btn btn-danger mt-3" onClick={handleClearEntries}>Clear All Entries</button>
      </div>
      <div className="journal-entries mt-5">
        {entries.length === 0 && <p>No entries yet. Start writing your first journal entry!</p>}
        {entries.map((entry, index) => (
          <div className="journal-entry card mb-3" key={index}>
            <div className="card-body">
              <p className="card-text">{entry.text}</p>
              <footer className="blockquote-footer">{entry.date}</footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
