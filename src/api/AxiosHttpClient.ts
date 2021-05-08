import axios from 'axios';
import HttpProvider from './HttpProvider';

const axiosHttpClient: HttpProvider = {
  async get<T>(url: string, headers?: Record<string, unknown>) {
    try {
      const response = await axios.get<T>(url, { headers });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default axiosHttpClient;
