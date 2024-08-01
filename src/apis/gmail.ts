import axiosClient from '@/lib/axios';
import HTTPService from '../services/HTTPService';

const GmailApi = {
  startWatching: () => HTTPService.sendRequestWithToken('POST', '/v1/gmail/start-watching'),
  stopWatching: () => HTTPService.sendRequestWithToken('POST', '/v1/gmail/stop-watching'),
  sendEmail: (params: any) =>
    HTTPService.sendRequestWithToken('POST', '/v1/gmail/send-email', {}, params),
  pendingEmail: () => HTTPService.sendRequestWithToken('GET', '/v1/gmail/pending'),
  replyEmail: async (payload = {}) => {
    const data = await axiosClient.post('/v1/gmail/reply-email', payload);
    return data.data;
  },
  getEmail: () => HTTPService.sendRequestWithToken('GET', '/v1/gmail'),
};

export default GmailApi;
