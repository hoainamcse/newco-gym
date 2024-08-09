import axiosClient, { ApiResponse } from '@/lib/axios';

const UserApi = {
  me: async () => {
    const data = await axiosClient.get<ApiResponse>('/v1/users/me');
    return data.data;
  },
};

export default UserApi;
