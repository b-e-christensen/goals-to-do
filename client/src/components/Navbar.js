import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Auth from '../utils/auth';

// In Navbar, we can assign a style from an object by using curly braces
function Navbar({ currentPage, handlePageChange }) {
  return (
    <div className='nav-card'>
      <div className='nav-card-header'>
        <Link to="/todos">To Do</Link>
        <Link to="/goals">Goals</Link>
        <button onClick={Auth.logout}>Logout</button>
        </div>

    </div>
  );
}

export default Navbar;
