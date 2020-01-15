import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from "framer-motion";

export default class Sift extends Component {

    constructor(props) {
        super(props);

        this.state = {
            resume1: null,
            resume2: null,
            id1: null,
            id2: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/rushees/request-match/2').then((res) => {
            console.log(res.data);
            this.setState({
                resume1: res.data[0].resume,
                resume2: res.data[1].resume,
                id1: res.data[0]._id,
                id2: res.data[1]._id
            });
            console.log(this.state);
        });
    }

    render() {

        let magic = {
            "textAlign": "center",
	        "float": "center"
        };

       let half = {
            display: "inline-block",
            width: "45%"
        };

        let resume = {
            padding: "20px 0px",
            width: "100%",
            height: "725px",
        };

        let spacer = {
            width: "5%",
            display: "inline-block"
        };

        let id1 = this.state.id1;
        let id2 = this.state.id2;

        // Used to shield against users mashing the same arrow key repeatedly
        function sleep(milliseconds) {
            const date = Date.now();
            let currentDate = null;
            do {
              currentDate = Date.now();
            } while (currentDate - date < milliseconds);
        }

        // Left and right arrow keys choose the winner of the resume match
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            
            if (evt.keyCode === 37) {
                if (evt.repeat) { return }

                console.log('http://localhost:5000/rushees/submit-match/' + id1 + '/' + id2);
                axios.post('http://localhost:5000/rushees/submit-match/' + id1 + '/' + id2).then( res => {
                    sleep(1000);
                    window.location.reload();
                });
            }
            else if (evt.keyCode === 39) {
                if (evt.repeat) { return }

                console.log('http://localhost:5000/rushees/submit-match/' + id2 + '/' + id1);
                axios.post('http://localhost:5000/rushees/submit-match/' + id2 + '/' + id1).then( res => {
                    sleep(1000);
                    window.location.reload();
                });
            }
        };

        return (
            <footer style={magic}>
                <div className="container" onKeyDown={this.onKeyPressed} tabIndex="0">
                    <motion.div 
                    animate={{ scale: 1 }} 
                    transition={{ duration: 1 }} 
                    initial={{ scale: 0.8}} 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={half}>
                        <object style={resume} data={this.state.resume1} type="application/pdf">
                            Resume could not load.
                        </object>
                    </motion.div>

                    <div style={spacer}></div>

                    <motion.div 
                    animate={{ scale: 1 }} 
                    transition={{ duration: 1 }} 
                    initial={{ scale: 0.8}} 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={half}>
                        <object style={resume} data={this.state.resume2} type="application/pdf">
                            Resume could not load.
                        </object>
                    </motion.div>
                </div>
            </footer>
        );
    }

}