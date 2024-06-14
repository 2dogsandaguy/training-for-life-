import React, { useState, useEffect } from 'react';
import './Journal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation, useQuery } from '@apollo/client';
import { SET_JOURNAL, DELETE_JOURNAL } from '../../utils/mutations';
import { GET_ME } from '../../utils/queries';
import AuthService from '../../utils/auth';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const { loading, data, refetch } = useQuery(GET_ME);
  const [setJournal] = useMutation(SET_JOURNAL);
  const [deleteJournal] = useMutation(DELETE_JOURNAL);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setEntries(storedEntries);
  }, []);

  useEffect(() => {
    if (data && data.me && data.me.journals) {
      setEntries(data.me.journals);
    }
  }, [data]);

  const handleEntryChange = (e) => {
    setNewEntry(e.target.value);
  };

  const handleSaveEntry = async () => {
    const createdAt = new Date().toISOString();
    try {
      const { data: newData } = await setJournal({
        variables: {
          journal: newEntry,
          createdAt: createdAt,
        },
      });

      await refetch(); // Ensure the latest data is fetched
      setNewEntry('');
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };

  const handleDeleteEntry = async (journalId) => {
    try {
      await deleteJournal({ variables: { journalId } });
      await refetch(); // Ensure the latest data is fetched
    } catch (error) {
      console.error("Error deleting journal entry:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

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
      </div>
      <div className="journal-entries mt-5">
        {entries.length === 0 && <p>No entries yet. Start writing your first journal entry!</p>}
        {entries.map((entry) => (
          <div className="journal-entry card mb-3" key={entry._id}>
            <div className="card-body">
              <p className="card-text">{entry.journal}</p>
              <footer className="blockquote-footer">{new Date(entry.createdAt).toLocaleString()}</footer>
              <button className="btn btn-danger mt-3" onClick={() => handleDeleteEntry(entry._id)}>Delete Entry</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
