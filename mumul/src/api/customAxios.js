import axios from 'axios';

export const customAxios = axios.create({
// 서버 주소를 ec2 backend instance ip로 전역 설정
  baseURL: `http://3.37.158.206`, 
  withCredentials: true,
});