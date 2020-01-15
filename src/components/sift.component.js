import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PDFReader } from 'react-read-pdf'

export default class Sift extends Component {

    render() {
        return (
            <div>
                <p>Sift!</p> 

                <embed src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://dsp-winter-2020-resumes.s3-us-west-1.amazonaws.com/JackZhang-Resume.pdf" width="500" height="375" />

            </div>
        );
    }

}