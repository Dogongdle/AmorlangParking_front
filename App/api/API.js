import {create} from 'apisauce';
import {parkingURL} from '@env';

export const baseURL = `${parkingURL}`;

const parkingAPI = create({
  baseURL,
});

export default parkingAPI;
