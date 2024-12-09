import instance from '@/utils/request/index';
import { AxiosResponse } from 'axios';
export default {
  /**
   * 系统-登录
   */
  async authLogin(name: string, password: string) {
    const response: AxiosResponse = await instance.post('/admin/login', { usernameOrPhone: name, password });
    return response.data;
  },
};
