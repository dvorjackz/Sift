import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {

        const nav = {
            paddingBottom: "0px"
        };

        return (
            <nav style={nav} className="navbar navbar-light navbar-expand-lg">
                <Link to="/" className="navbar-brand">Sift</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto"> 
                        <li className="navbar-item">
                            <Link to="/rankings" className="nav-link">Rankings</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Add Rushee</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

}