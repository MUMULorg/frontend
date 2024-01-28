import axios from "axios";
import baseUrl from "./baseUrl";

export const getUserInfo = async () => {
  const path = "/v1/oauth/user/info";

  try {
 
    axios.interceptors.response.use(response => {
      return response.headers['content-type'] === 'application/json' ? response : Promise.reject(response);
    }, error => Promise.reject(error));


    const response = await axios.get(
      'https://mumul.site/v1/oauth/user/info', {
      headers: {
       // "Cache-Control": "no-cache",
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": false,
      },
      // withCredentials: true,
      cache: 'no-cache', // 캐시를 비우는 옵션 추가
    });


    if (response.status !== 200) {
      throw new Error('bad server condition');
    }
    console.log("getUserInfo 로그인 여부: ", response.data);
    return response.data; // response.data로 수정

  } catch (e) {
    console.error('getUserInfo Error: ', e.message);
    return false;
  }
};
