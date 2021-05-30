//API 통신 기본 설정 git의 오픈소스 특성을 감안하여 baseurl은 별도 환경을 통해 관리
import {create} from 'apisauce';
import {parkingURL} from '@env';

export const baseURL = `${parkingURL}`;

const parkingAPI = create({
  baseURL,
});

export default parkingAPI;
