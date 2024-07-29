import HTTPService from '../services/HTTPService';

const AuthApi = {
  signIn: () => HTTPService.sendRequest('GET', '/v1/auth'),
  oauth2callback: (params: any) =>
    HTTPService.sendRequest('GET', '/v1/auth/oauth2callback', {}, params),
  facebookSignIn: () => HTTPService.sendRequest('GET', '/v1/auth/facebook'),
  facebookCallback: (params: any) =>
    HTTPService.sendRequestWithToken('GET', '/v1/auth/facebook/oauth2callback', {}, params),
};

export default AuthApi;
