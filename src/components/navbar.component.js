import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ height }) => {
    const nav = {
        position: 'fixed',
        height: height
    };

    return (
        <nav style={nav} className="navbar navbar-light navbar-expand-lg">
            <Link to="/" className="navbar-brand"><b>sift</b></Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto"> 
                    <li className="navbar-item">
                        <Link to="/rankings" className="nav-link">rankings</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">add applicant</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
