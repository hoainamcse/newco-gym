import axiosClient from '@/lib/axios';

const UserApi = {
  me: async () => {
    const data = await axiosClient.get('/v1/gmail/users/me');
    return data.data;
  },
};

export default UserApi;
