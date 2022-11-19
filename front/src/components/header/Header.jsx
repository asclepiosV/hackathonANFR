import React from 'react';
import './header.css'
import logo from '../../assets/logo.svg'

function Header() {
    return (
        <div>
            <header className='navBar'>
                <div className="logo-container">
                    <img src={logo} />
                </div>
                <ul className="nav-list" id="nav-list">
                    <li className="list-item">
                        <a href="#">Map</a>
                    </li>
                    <li className="list-item">
                        <a href="#">Explanations</a>
                    </li>
                </ul>
                <div className="menu" id="toggle-button" onclick="toggleNav()">
                    <div className="menu-line-1"></div>
                    <div className="menu-line-2"></div>
                    <div className="menu-line-3"></div>
                </div>
            </header>
        </div>
    );
}

export default Header;