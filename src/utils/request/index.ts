import axios from 'axios';
import router from '../../router';
import { message } from 'ant-design-vue';

interface Error {
  response: {
    data: {
      code: null;
      msg: '';
    };
  };
}

window.__axiosPromiseArr = [];

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// Axios 请求拦截器
instance.interceptors.request.use(async (config) => {
  if (sessionStorage.getItem('tokenValue')) {
    config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('tokenValue')}`;
  }

  // 将cancel放置于全局变量的数组中, 用于取消请求
  config.cancelToken = new axios.CancelToken((cancel) => {
    window.__axiosPromiseArr.push({
      cancel,
    });
  });

  return config;
});

// Axios 响应拦截器 对返回码进行处理处理
instance.interceptors.response.use(
  async (res) => {
    if (res.status === 200) {
      // 调用成功返回接口数据
      if (res.data.code === 200) {
        return res.data;
      } else if (res.data.code === 9999 || res.data.code === 401) {
        router.replace({
          name: 'login',
        });
        message.error('登录已过期，请重新登录');
      }
    } else {
      return Promise.reject(res.data.msg);
    }
  },
  (err: Error) => {
    if (err.response && err.response.data.code === 401) {
      router.replace({
        name: 'login',
      });
      message.error('登录已过期，请重新登录');
    } else {
      message.error(err.response.data?.msg);
    }
    return Promise.reject(err.response.data.msg);
  }
);

export default instance;
