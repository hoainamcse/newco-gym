import HTTPService from '../services/HTTPService';

const SettingsApi = {
  list: () => HTTPService.sendRequestWithToken('GET', '/v1/settings/'),
  create: (params: any) => HTTPService.sendRequestWithToken('POST', '/v1/settings/', {}, params),
  delete: (id: string) => HTTPService.sendRequestWithToken('DELETE', `/v1/settings/${id}`),
};

export default SettingsApi;
