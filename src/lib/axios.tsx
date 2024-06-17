import { default as xhr } from 'axios';

const abortSignal = new AbortController();
const getLocalStorage = localStorage.getItem('jasamarga')

const axios = xhr.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  timeout: 60000
});

axios.interceptors.request.use(
  config => {
    if (getLocalStorage) {
      const localStorage = JSON.parse(getLocalStorage);
      const token = localStorage.data.token;
      if (token) config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.signal = abortSignal.signal
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    const data = response;
    return data;
  },
  (error: any) => {
    if (error.response.status === 401) {
      window.location.href = '/'
      localStorage.clear()
    }
    return Promise.reject(error);
  },
);

export default axios;