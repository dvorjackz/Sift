import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

import config from '../config';
import { Axios } from '../util/config';
import Loading from './Loading';

const Sift = () => {
    const [resumePairs, setResumePairs] = useState([]);
    // For dealing with HTTP request blocking
    const [loaded, setLoaded] = useState(false);
    // Following two help just slightly with images flickering on load
    const [img1Loaded, setImg1Loaded] = useState(false);
    const [img2Loaded, setImg2Loaded] = useState(false);

    // When there aren't many resumes remaining in the queue, add more
    const restockResumes = () => {
        Axios.get('applicants/requestMatch/', {
            params: {
                count: config.app.queueSize,
            }
        }).then((res) => {
            console.log('Reloading resumes!');
            setResumePairs(resumePairs.concat(res.data))
        }).catch((err) => {
            console.log(err);
        })
    }

    const pickResume = async (resume1wins, resume1, resume2) => {
        let winner = resume1wins ? resume1 : resume2;
        let loser = resume1wins ? resume2 : resume1;

        setLoaded(false);
        setImg1Loaded(false);
        setImg2Loaded(false);

        await Axios.post('applicants/submitMatch/' + winner + '/' + loser).then((res) => {
            // Remove resume pair from head of queue
            const removeHead = resumePairs.slice(1);
            setResumePairs(removeHead);

            if (removeHead.length === 0) {
                restockResumes();
                alert('Please slow down the pace! 😓')
                setTimeout(() => {
                    setLoaded(true);
                }, 3000);
            } else {
                setLoaded(true);
            }

            // When there aren't many resumes remaining in the queue, add more
            if (removeHead.length === config.app.safety) {
                restockResumes();
            }
        });
    }

    useEffect(() => {
        Axios.get('applicants/requestMatch/', {
            params: {
                count: config.app.queueSize,
            }
        }).then((res) => {
            setResumePairs(res.data);
            setTimeout(() => {
                setLoaded(true);
            }, 1000);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const containerStyles = {
        height: window.innerHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    };

    const subContainerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    const resumeStyles = {
        borderRadius: '1%',
        boxShadow: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
        margin: '10px'
    };

    if (loaded) {
        return (
            <div style={containerStyles}>
                <div style={subContainerStyles}>
                    <motion.div 
                        transition={{ duration: 0.2 }} 
                        whileHover={{ scale: 1.025 }}
                        whileTap={{ scale: 0.95 }}
                        onClick=
                            {
                                () => {
                                        pickResume(
                                            true, 
                                            resumePairs[0][0]._id, 
                                            resumePairs[0][1]._id
                                        )
                                    }
                            }
                    >
                        <div class="fade-in">
                            <img
                                onLoad={() => setImg1Loaded(true)}
                                style={{...resumeStyles, ...{display: img1Loaded ? 'inline' : 'none'}}}
                                draggable={false}
                                height={window.innerHeight*4/5}
                                src={resumePairs[0][0].resumeURL}
                                alt={'Could not load'} />
                        </div>   
                    </motion.div>

                    <a href={resumePairs[0][0].resumeURL} target='_blank' rel='noreferrer'>
                        🔍
                    </a>
                </div>

                <div style={subContainerStyles}>
                    <motion.div 
                        transition={{ duration: 0.2 }} 
                        whileHover={{ scale: 1.025 }}
                        whileTap={{ scale: 0.95 }}
                        onClick=
                            {
                                () => {
                                        pickResume(
                                            false, 
                                            resumePairs[0][0]._id, 
                                            resumePairs[0][1]._id
                                        )
                                    }
                            }
                    >
                        <div class="fade-in">
                            <img
                                onLoad={() => setImg2Loaded(true)}
                                style={{...resumeStyles, ...{display: img2Loaded ? 'inline' : 'none'}}}
                                draggable={false}
                                height={window.innerHeight*4/5}
                                src={resumePairs[0][1].resumeURL}
                                alt={'Could not load'} />
                        </div>
                    </motion.div>

                    <a href={resumePairs[0][1].resumeURL} target='_blank' rel='noreferrer'>
                        🔍
                    </a>
                </div>
            </div>
        );
    } else {
        return (
            <Loading />
        );
    }
}

export default Sift;