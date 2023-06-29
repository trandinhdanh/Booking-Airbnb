import { https } from './axiosClient';

export let userService = {
  getOder: (idUser) => {
    return https.get(`/api/v1/users/${idUser}/orders`);
  },
 
};
