import axiosClient from '@/lib/axios';
import HTTPService from '../services/HTTPService';
import { disconnect } from 'process';

const AuthApi = {
  signIn: () => HTTPService.sendRequest('GET', '/v1/auth'),
  oauth2callback: (params: any) =>
    HTTPService.sendRequest('GET', '/v1/auth/oauth2callback', {}, params),
  connectFacebook: () => HTTPService.sendRequest('GET', '/v1/auth/facebook'),
  facebookCallback: (params: any) =>
    HTTPService.sendRequestWithToken('GET', '/v1/auth/facebook/oauth2callback', {}, params),
  disconnectFacebook: async () => {
    const data = await axiosClient.delete('/v1/auth/facebook');
    return data.data;
  },
  connectWhatsapp: async (params = {}) => {
    const data = await axiosClient.get('/v1/auth/whatsapp', { params });
    return data.data;
  },
  disconnectWhatsapp: async () => {
    const data = await axiosClient.delete('/v1/auth/whatsapp');
    return data.data;
  },
};

export default AuthApi;
