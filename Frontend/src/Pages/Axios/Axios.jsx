import axios from "axios"; 

const instance = axios.create({
  baseURL : 'https://chat-app-ol0u.onrender.com',
  // baseURL : 'http://localhost:2029',
  withCredentials: true,
  headers: {
    ContentType: "application/json",
    timeout : 1000,
  }, 

});

export default instance;