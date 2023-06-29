import { https } from './axiosClient';

export let orderService = {
  order: (data) => {
    return https.post('/api/v1/orders', data);
  },
};
