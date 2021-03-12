import React, { Component } from 'react';
import { motion } from "framer-motion";

import config from '../config';
import { Axios } from '../util/config';

export default class Sift extends Component {

    constructor(props) {
        super(props);

        this.state = {
            resumes: null,
            resume1: null,
            resume2: null,
            id1: null,
            id2: null
        }

        Axios.get('applicants/requestMatch/', {
			params: {
			  	count: config.app.queueSize,
			}
		}).then((res) => {
            this.setState({
                resumes: res.data,
                resume1: res.data[0][0].resumeURL,
                resume2: res.data[0][1].resumeURL,
                id1: res.data[0][0]._id,
                id2: res.data[0][1]._id
            });
		}).catch((err) => {
			console.log(err);
		})
    }

    render() {
        const magic = {
            "textAlign": "center",
	        "float": "center"
        };

       const half = {
            display: "inline-block",
            width: "45%"
        };

        const resume = {
            padding: "20px 0px",
            width: "100%",
            height: "725px",
        };

        const spacer = {
            width: "5%",
            display: "inline-block"
        };

        // Used to shield against users mashing the same arrow key repeatedly
        function sleep(milliseconds) {
            const date = Date.now();
            let currentDate = null;
            do {
              currentDate = Date.now();
            } while (currentDate - date < milliseconds);
        }

        // For using global this inside keydown function
        var tthis = this;

        // Left and right arrow keys choose the winner of the resume match
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.repeat) { return }

            let winner = null;
            let loser = null;

            if (evt.keyCode === 37) {
                winner = tthis.state.id1;
                loser = tthis.state.id2;
            }
            else if (evt.keyCode === 39) {
                winner = tthis.state.id2;
                loser = tthis.state.id1;
            }

            Axios.post('applicants/submitMatch/' + winner + '/' + loser).then( res => {
                // Remove two resumes from head of queue and update accoringly
                console.log(res.data);

                tthis.setState({
                    resumes: tthis.state.resumes.filter((_, i) => i !== 0),
                    resume1: tthis.state.resumes[0][0].resumeURL,
                    resume2: tthis.state.resumes[0][1].resumeURL,
                    id1: tthis.state.resumes[0][0]._id,
                    id2: tthis.state.resumes[0][1]._id
                });

                // When there aren't many resumes remaining in the queue, add more
                if (tthis.state.resumes.length === config.app.safety) {
                    Axios.get('applicants/requestMatch/', {
                        params: {
                              count: config.app.queueSize,
                        }
                    }).then((res) => {
                        console.log('Reloading resumes!');
                        tthis.setState({
                            resumes: tthis.state.resumes.concat(res.data)
                        });
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            });
        };

        return (
            <footer style={magic}>
                <div className="container" onKeyDown={this.onKeyPressed} tabIndex="0">
                    <motion.div 
                    animate={{ scale: 1 }} 
                    transition={{ duration: 1 }} 
                    initial={{ scale: 0.8}} 
                    whileHover={{ scale: 1.05 }}
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
                    whileHover={{ scale: 1.05 }}
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