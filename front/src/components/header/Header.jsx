import React from 'react';
import './header.css'
import logo from '../../assets/logo.svg'

function Header() {
    return (
        <div>
            <header className='navBar'>
                <div className="logo-container">
                    <a href='/'>
                        <img src={logo} />                        
                    </a>
                </div>
                <ul className="nav-list" id="nav-list">
                    <li className="list-item">
                        <a href="/">Map</a>
                    </li>
                </ul>
            </header>
        </div>
    );
}

export default Header;