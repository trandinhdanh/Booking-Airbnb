import { https } from './axiosClient';

export let userService = {
  getOrder: (idUser) => {
    return https.get(`/api/v1/users/${idUser}/orders`);
  },
 
};
