import HTTPService from '../services/HTTPService';

const User = {
  me: () => HTTPService.sendRequestWithToken('GET', '/v1/gmail/users/me'),
};

export default User;
