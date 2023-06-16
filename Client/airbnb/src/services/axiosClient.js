import axios from 'axios';
import { localStorageService } from './localStorageService';

// export const TOKEN = process.env.REACT_APP_TOKEN;

export const https = axios.create({
  // baseURL: process.env.REACT_APP_API_KEY,
  baseURL : "http://localhost:8080",
  headers: {
    // TokenCybersoft: TOKEN,
    Token: localStorageService.get('accessToken'),
  },
});

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
