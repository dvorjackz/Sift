import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateRushee extends Component {

    state = {
        selectedFile: null
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    fileUploadHandler = event => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('http://localhost:5000/rushees/upload-resume', fd, {
            onUploadProgress: progressEvent => {
                console.log("Upload progress: " + Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%");
            }
        }).then((res) => {
            alert("Uploaded successfully.")
        });
    }

    render() {
        return (
            <div>
                <p>Add a Rushee.</p>
                <input type="file" onChange={this.fileSelectedHandler} />
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
        );
    }

}