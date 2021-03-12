import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import { HTTPClient } from '../axiosConfig';

const Upload = () => {
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [numFiles, setNumFiles] = useState(0);

    const showAlert = ()=>{
        setVisibleAlert(true);
        setTimeout(() => {
            setVisibleAlert(true);
        }, 3000);
    }

    const fileSelectedHandler = (event) => {
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
            setNumFiles(res.data.numFiles);
            showAlert();
        });
    }

    const containerStyle = {
        height: window.innerHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
            <Alert color="info" isOpen={visibleAlert} style={alert}>
                {numFiles} resumes were added!
            </Alert>
            <div style={containerStyle}>
                <label className="btn btn-outline-primary">
                    Upload Resumes <input type="file" onChange={(event) => fileSelectedHandler(event)} hidden multiple/>
                </label>
                <p>
                    or
                </p>
                <label className="btn btn-outline-primary">
                    Upload excel <input type="file" onChange={(event) => fileSelectedHandler(event)} hidden multiple/>
                </label>
            </div>
        </div>
    );
}

export default Upload;
