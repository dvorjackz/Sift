import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Sift extends Component {

    constructor(props) {
        super(props);

        this.state = {
            resume1: null,
            resume2: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/rushees/request-match/2').then((res) => {
            console.log(res.data);
            this.setState({
                resume1: res.data[0].resume,
                resume2: res.data[1].resume
            });
        });
    }

    render() {

        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.keyCode == 37) {
                console.log("left");
            }
            else if (evt.keyCode == 39) {
                console.log("right");
            }
        };

        const resume = {
            padding: "20px",
            display: "inline",
            float: "none"
        };

        return (
            <div onKeyDown={this.onKeyPressed}
            tabIndex="0">
                <p>Sift!</p> 

                <embed style={resume} src={this.state.resume1} width="500" height="375" />

                <embed style={resume} src={this.state.resume2} width="500" height="375" />

            </div>
        );
    }

}