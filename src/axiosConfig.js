import axios from 'axios';

const env = process.env.NODE_ENV; // current environment

export const HTTPClient = axios.create({
  baseURL:
    env === 'production'
      ? 'http://ec2-13-52-240-42.us-west-1.compute.amazonaws.com/api/' // production
      : 'http://localhost:8888/', // development
});