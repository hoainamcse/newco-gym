import axiosClient from '@/lib/axios';

const SettingsApi = {
  list: async () => {
    const data = await axiosClient.get('/v1/settings/');
    return data.data;
  },
  create: async (payload = {}) => {
    const data = await axiosClient.post('/v1/settings/', payload);
    return data.data;
  },
  delete: async (id: string) => {
    const data = await axiosClient.delete(`/v1/settings/${id}`);
    return data.data;
  },
};

export default SettingsApi;
