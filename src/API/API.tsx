import axios from "axios";


const baseURL = 'http://192.168.100.28:3001/api/'; 

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json', 
  },
});

export default API;
