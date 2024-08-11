import axiosClient, { type ApiResponse } from '@/lib/axios';
import HTTPService from '../services/HTTPService';
import type { Email } from '@/types';

interface GmailQuery {
  pending?: boolean;
  sender_addresses?: string[];
  limit?: number;
  skip?: number;
}

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

  getEmails: async (params: GmailQuery = {}) => {
    const data = await axiosClient.get<ApiResponse<Email[]>>('/v1/gmail', { params });
    return data.data;
  },

  getPolling: async (timestamp: number, params: GmailQuery = {}) => {
    const data = await axiosClient.get(`/v1/gmail/polling/${timestamp}`, { params });
    return data.data;
  },
};

export default GmailApi;
