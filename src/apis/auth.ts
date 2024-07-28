import HTTPService from '../services/HTTPService';

const Auth = {
  signIn: () => HTTPService.sendRequest('GET', '/v1/auth'),
  oauth2callback: (params: any) =>
    HTTPService.sendRequest('GET', '/v1/auth/oauth2callback', {}, params),
};

export default Auth;
