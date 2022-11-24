import axios from 'axios';
import {backendUrl} from "./constants"
import {notification} from 'antd';

axios.defaults.baseURL = backendUrl;

axios.interceptors.request.use(
    config => {
      if (config.url.includes("/login")) return config;

      const token = localStorage.getItem("token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    err => {
      Promise.reject(err);
    }
);

axios.interceptors.response.use(
    response => {
      return response;
    },
    err => {
      if (err.response?.status === 401 && !err?.response.config.url.includes("/login")) {
        localStorage.clear();
        window.location.reload();
        notification.error({
          message: "กรุณาเข้าสู่ระบบใหม่"
        });

        return Promise.reject(err);
      }

      if (err.response?.status === 403) {
        notification.error({
          message: "คุณไม่มีสิทธิเข้าถึง กรุณาติดต่อแอดมิน"
        });
      }

      return Promise.reject(err);
    }
);

export default axios;