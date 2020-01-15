import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Rankings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rankings: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/rushees/rankings').then((res) => {
            console.log(res.data);
            this.setState({
                rankings: res.data
            });
            console.log(this.state);
        });
    }

    render() {
        return (
            <div>
                <p>Rankings.</p>
            </div>
        );
    }

}