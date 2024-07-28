import HTTPService from '../services/HTTPService';

const Heath = {
  check: () => HTTPService.sendRequest('GET', '/ping'),
};

export default Heath;
