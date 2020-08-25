# Sift
Compare two resumes at time. Left and right arrow keys select the "winning" resume. Resumes are ranked using a chess-based elo system. Resumes are pulled in batches to improve performance. Backend repo found [here](https://github.com/dvorjackz/Sift-backend). Live at [bit.ly/dsp-sift](https://bit.ly/dsp-sift). When adding resumes, make sure the resumes are named "First Last.pdf" so that the names can be parsed correctly. Built using the MERN stack.
    
### Deployment Instructions
Access EC2 instance (local copy of poolfolio.pem required): 
```
ssh -i sift.pem ubuntu@ec2-13-52-240-42.us-west-1.compute.amazonaws.com
```
Deploy backend: 
```
cd /opt/back-end
sudo pm2 start server.js
```
Deploy frontend:
```
cd /opt/front-end
sudo yarn build
(sudo systemctl restart nginx)
```
