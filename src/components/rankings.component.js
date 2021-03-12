import React, { Component } from 'react';
import { motion } from 'framer-motion';

import { Axios } from '../util/config'

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
        <motion.li variants={item} style={ {listStyleType: "none"} } key={rushee._id}><a href={rushee.resumeURL}>{rushee.firstName} {rushee.lastName}</a></motion.li>
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
        Axios.get('applicants/rankings').then((res) => {
            this.setState({
                rankings: res.data
            });
        });
    }

    render() {

        const middle = {
            height: '70vh',
            marginTop: '10vh',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            overflowY: "auto",
        };

        return (
            <motion.ol 
            variants={container}
            initial="hidden"
            animate="show" 
            style={middle}>
                <Ranking rushees={this.state.rankings}></Ranking>
            </motion.ol>
        );
    }

}