import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://df9sqsdo88.execute-api.us-west-1.amazonaws.com/v1/',
});

export { Axios };