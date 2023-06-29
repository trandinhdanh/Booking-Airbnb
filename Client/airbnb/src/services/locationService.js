import { https } from './axiosClient';

export let locationService = {
  getLocationList: () => {
    return https.get(`/api/v1/locations`);
  },
};
