import React from 'react';
import '../styles/Navbar.css';
import Auth from '../utils/auth';

// In Navbar, we can assign a style from an object by using curly braces
function Navbar({ currentPage, handlePageChange }) {
  return (
    <div className='nav-card'>
      <div className='nav-card-header'>
        <a href='#todo' onClick={() => handlePageChange("TODO")}>To Do</a>
        <a href='#goals' onClick={() => handlePageChange("GOALS")}>Goals</a>
        <button onClick={Auth.logout}>Logout</button>
        </div>

    </div>
  );
}

export default Navbar;
