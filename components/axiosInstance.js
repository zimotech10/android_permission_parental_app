// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://parental.app.multiplayertv.io/', // Replace with your API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
