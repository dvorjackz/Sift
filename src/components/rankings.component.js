import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Axios } from '../util/config'
import Loading from './Loading';
  
const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
}

const Rankings = () => {
    const [rankings, setRankings] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Axios.get('applicants/rankings')
            .then((res) => {
                setRankings(res.data);
                setLoaded(true);
            })
            .catch((err) => {
                alert('Could not retrive rankings');
            });
    }, []);

    const containerStyle = {
        height: window.innerHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const rankingStyle = {
        height: window.innerHeight*3/4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto'
    };

    if (loaded) {
        return (
            <div style={containerStyle}>
                <div style={rankingStyle}>
                    {
                        rankings.map(applicant => (
                            <motion.li variants={item} style={ {listStyleType: "none"} } key={applicant._id}>
                                <a href={applicant.resumeURL}>
                                    {applicant.firstName} {applicant.lastName}
                                </a>
                            </motion.li>
                        ))
                    }
                </div>      
            </div>      
        );
    } else {
        return (
            <Loading />
        );
    }
}

export default Rankings;
