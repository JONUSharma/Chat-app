import axios from "axios"; 

const instance = axios.create({
  baseURL : 'https://chat-app-29m9.onrender.com',
  withCredentials: true,
  headers: {
    ContentType: "application/json",
    timeout : 1000,
  }, 

});

export default instance;