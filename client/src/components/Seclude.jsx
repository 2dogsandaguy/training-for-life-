// src/components/Seclude.jsx
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './Seclude.css'; // Ensure this path is correct
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from 'react-router-dom';
const Seclude = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format("h:mm:ss A  MMM /D /YYYY"));
  const [tasks, setTasks] = useState([]);

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

  const saveTasksToLocalStorage = () => {
    const updatedTasks = [];

    document.querySelectorAll(".time-block").forEach(block => {
      const timerText = block.getAttribute("id");
      const fillerTask = block.querySelector(".description").value.trim();

      const taskIndex = tasks.findIndex(item => item.id === timerText);
      if (taskIndex !== -1) {
        updatedTasks[taskIndex].task = fillerTask;
      } else {
        updatedTasks.push({ id: timerText, task: fillerTask });
      }
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const clearTasks = () => {
    localStorage.clear();
    setTasks([]);
    window.location.reload();
  };

  const renderTimeBlocks = () => {
    const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 
            12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]; // 1AM to 12PM

    return hours.map(hour => {
      const task = tasks.find(item => item.id === `hour-${hour}`)?.task || "";

      return (
        <div id={`hour-${hour}`} className="row time-block" key={hour}>
          <div className="col-2 col-md-1 hour text-center py-3">{dayjs().hour(hour).format("hA")}</div>
          <textarea className="col-8 col-md-10 description" rows="3" defaultValue={task}></textarea>
          <button className="btn saveBtn col-2 col-md-1" aria-label="save" onClick={saveTasksToLocalStorage}>
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
              <Link to="/">Home</Link>
              {/* Add more links as needed */}
            </div>
          </div>
        </div>
    
      <header className="p-5 mb-4 border-5 border-bottom border-dark text-center">
        <h1 className="display-3 ">Work Day Scheduler</h1>
        <p className="lead">A simple calendar app for scheduling your work day</p>
        <p id="currentDay" className="lead">{currentTime}</p>
        <button id="clearBtn" className="btn btn-secondary" onClick={clearTasks}>Reset The Day</button>
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
