import HTTPService from '../services/HTTPService';

const UserApi = {
  me: () => HTTPService.sendRequestWithToken('GET', '/v1/gmail/users/me'),
};

export default UserApi;
