import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // change this if your backend runs elsewhere
  withCredentials: true, // optional: for handling cookies/auth
});

// Automatically handle errors (optional)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = error.response?.data || {
      message: 'Something went wrong!',
    };
    return Promise.reject(customError);
  }
);

export default API;
