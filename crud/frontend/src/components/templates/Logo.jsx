import './Logo.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../.././assets/imgs/cod3r.png'

export default props => {
    return (
        <aside className="logo">
            <Link to="/" className="logo">
                <img src={logo} alt="logo" />
            </Link>
        </aside>
    )
}