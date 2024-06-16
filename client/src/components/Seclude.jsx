import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './Seclude.css'; // Ensure this path is correct
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SAVE_TASKS, CLEAR_TASKS } from '../../utils/mutations';

const Seclude = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format("h:mm:ss A  MMM /D /YYYY"));
  const [tasks, setTasks] = useState([]);

  const [saveTasks, { error: saveError }] = useMutation(SAVE_TASKS);
  const [clearTasks, { error: clearError }] = useMutation(CLEAR_TASKS);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("h:mm:ss A  MMM /D /YYYY"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);

    logColors();
  }, []);

  useEffect(() => {
    logColors();
  }, [currentTime]);

  const logColors = () => {
    const nowHour = dayjs().hour();
    const plannerHours = document.querySelectorAll('[id^="hour-"]');

    plannerHours.forEach(element => {
      const id = element.getAttribute("id");
      const endingNumber = parseInt(id.split("-")[1], 10);

      if (endingNumber > nowHour) {
        element.classList.add("future");
        element.classList.remove("present", "past");
      } else if (endingNumber === nowHour) {
        element.classList.add("present");
        element.classList.remove("future", "past");
      } else {
        element.classList.add("past");
        element.classList.remove("future", "present");
      }
    });
  };

  const saveTasksToServer = async () => {
    const updatedTasks = [];

    document.querySelectorAll(".time-block").forEach(block => {
      const timerText = block.getAttribute("id");
      const fillerTask = block.querySelector(".description").value.trim();

      if (fillerTask) { // Only include non-empty tasks
        updatedTasks.push({ id: timerText, task: fillerTask });
      }
    });

    console.log('Updated Tasks:', updatedTasks); // Debugging output

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    try {
      await saveTasks({ variables: { tasks: updatedTasks } });
      console.log('Tasks saved successfully.');
    } catch (e) {
      console.error('Error saving tasks:', e);
    }
  };

  const clearTasksFromServer = async () => {
    try {
      await clearTasks();
      setTasks([]);
      localStorage.clear();
      window.location.reload();
    } catch (e) {
      console.error('Error clearing tasks:', e);
    }
  };

  const renderTimeBlocks = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i + 1); // 1AM to 12PM

    return hours.map(hour => {
      const task = tasks.find(item => item.id === `hour-${hour}`)?.task || "";

      return (
        <div id={`hour-${hour}`} className="row time-block" key={hour}>
          <div className="col-2 col-md-1 hour text-center py-3">{dayjs().hour(hour).format("hA")}</div>
          <textarea className="col-8 col-md-10 description" rows="3" defaultValue={task}></textarea>
          <button className="btn saveBtn col-2 col-md-1" aria-label="save" onClick={saveTasksToServer}>
            <i className="fas fa-save" aria-hidden="true"></i>
          </button>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="dropdown-menu-container">
        <div className="dropdown">
          <button className="dropbtn">Menu</button>
          <div className="dropdown-content">
            <ul><Link to="/">Home</Link></ul>
            <ul><Link to="/Profile"> Profile</Link></ul>
            {/* Add more links as needed */}
          </div>
        </div>
      </div>

      <header className="p-5 mb-4 border-5 border-bottom border-dark text-center">
        <h1 className="display-3 ">Work Day Scheduler</h1>
        <p className="lead">A simple calendar app for scheduling your work day</p>
        <p id="currentDay" className="lead">{currentTime}</p>
        <button id="clearBtn" className="btn btn-secondary" onClick={clearTasksFromServer}>Reset The Day</button>
        <div className='colors'> 
          <span style={{ color: 'red' }}>Red: Now </span>
          <span style={{ color: 'blue' }}>Blue: Past </span>
          <span style={{ color: 'green' }}>Green: Future </span>
        </div>
      </header>
      <div className="container-lg px-5">
        {renderTimeBlocks()}
      </div>
    </div>
  );
};

export default Seclude;
