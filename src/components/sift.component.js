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

        const magic = {
            "text-align": "center",
	        "float": "center"
        };

        const half = {
            display: "inline-block",
            width: "50%"
        };

        const resume = {
            padding: "30px 40px",
            width: "100%",
            "min-height": "100vh",
        };

        return (
            <footer style={magic}>
                <div className="container" onKeyDown={this.onKeyPressed} tabIndex="0">
                    <div style={half}>
                        <object style={resume} data={this.state.resume1} type="application/pdf" />
                    </div>

                    <div style={half}>
                        <object style={resume} data={this.state.resume2} type="application/pdf" />
                    </div>
                </div>
            </footer>
        );
    }

}