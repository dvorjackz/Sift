import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { HTTPClient } from '../axiosConfig';

export default class CreateRushee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visibleAlert: false,
            numFiles: 0
        }
    }

    showAlert = ()=>{
        this.setState({visibleAlert: true}, () => {
            window.setTimeout(() => {
                this.setState({visibleAlert: false})
            }, 3000)
        });
    }

    fileSelectedHandler = event => {
        const fd = new FormData();
        for (let i = 0; i < event.target.files.length; i++) {
            // I think 'image', or the name of the field in the formdata must match what is used with multupload in the backend
            fd.append('files', event.target.files[i]);
        }
        console.log(fd.numFiles);
        HTTPClient.post('rushees/upload-resume', fd, {
            onUploadProgress: progressEvent => {
                console.log("Upload progress: " + Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%");
            }
        }).then((res) => {
            this.setState({numFiles: res.data.numFiles});
            this.showAlert();
        });
    }

    render() {

        const middle = {
            height: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        };

        const alert = {
            position: "absolute",
            margin: "0 auto",
            marginTop: "10px",
            left: "10vw",
            right: "10vw",
            textAlign: "center"
        }

        return (
            <div>
                <Alert color="info" isOpen={this.state.visibleAlert} style={alert}>
                    {this.state.numFiles} resumes were added!
                </Alert>
                <div style={middle}>
                    <label className="btn btn-outline-primary">
                        Upload Resumes <input type="file" onChange={this.fileSelectedHandler} hidden multiple/>
                    </label>
                    <label className="btn btn-outline-primary">
                        Upload excel <input type="file" onChange={this.fileSelectedHandler} hidden multiple/>
                    </label>
                </div>
            </div>
        );
    }

}