import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",

  },
});

// Automatically attach token if available
API.interceptors.request.use((req) => {
  // const token = localStorage.getItem("token");
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});



const multipartAPI = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",

  },
});


// Automatically attach token if available
multipartAPI.interceptors.request.use((req) => {
  // const token = localStorage.getItem("token");
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export {multipartAPI};
export default API;
