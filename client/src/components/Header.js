import React from 'react';
// Here we are importing a CSS file as a dependency
import '../styles/Header.css';

function Header() {
    return (

        <header className="header">
            <h1>Hamlet</h1>
            <h6 className='text-center'><i>-- to do or not to do --</i></h6>
        </header>
    );
}

export default Header;
