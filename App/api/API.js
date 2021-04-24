import {create} from 'apisauce';
import {parkingURL} from '@env';

export const baseURL = 'http://49.50.163.23:8080';

const parkingAPI = create({
  baseURL,
});

export default parkingAPI;
