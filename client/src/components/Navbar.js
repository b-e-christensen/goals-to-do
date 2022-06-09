import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Auth from '../utils/auth';
import ThemeSVG from '../styles/images/theme.svg'
import useLocalStorage from 'use-local-storage'

// In Navbar, we can assign a style from an object by using curly braces
function Navbar({ currentPage, handlePageChange }) {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const el = document.getElementById('root')
  el.classList.add(`${theme}`)
  
  const switchTheme = () => {
    el.classList.remove(`${theme}`)
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }


  return (
    <div className='nav-card'>
      <div className='nav-card-header'>
        <Link to="/todos">To Do</Link>
        <Link to="/goals">Goals</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/profile">Profile</Link>
        <button aria-label="Changes light and dark mode" id="darkmode-button" className="nav-link-dark" onClick={switchTheme}>
                        <img src={ThemeSVG} className="nav-link-dark-img"></img>
                        </button>
        <button onClick={Auth.logout} className="logout-btn custom-color-m">Logout</button>
        </div>

    </div>
  );
}

export default Navbar;
