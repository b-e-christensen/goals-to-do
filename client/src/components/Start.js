import React from 'react';

function Start({ currentPage, handlePageChange }) {
  return (
    <div className='start-card'>
      <div className='start-card-content'>
        <a href='/login' onClick={() => handlePageChange("LOGIN")}>Login</a>
        <a href='/signup' onClick={() => handlePageChange("SIGNUP")}>Sign Up</a>
        </div>

    </div>
  );
}

export default Start;
