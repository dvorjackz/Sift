import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from "framer-motion";

// Doesn't work because list is dynamically generated
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5
        }
    }
}
  
const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
}

const Ranking = ({rushees}) => (
    <>
      {rushees.map(rushee => (
        <motion.li variants={item} style={ {listStyleType: "none"} } key={rushee._id}>{rushee.firstName} {rushee.lastName}</motion.li>
      ))}
    </>
  ); 

export default class Rankings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rankings: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/rushees/rankings').then((res) => {
            this.setState({
                rankings: res.data
            });
        });
    }

    render() {

        const middle = {
            height: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        };

        return (
            <motion.ol variants={container}
            initial="hidden"
            animate="show" style={middle}>
                <Ranking rushees={this.state.rankings}></Ranking>
            </motion.ol>
        );
    }

}