import axios from "axios";
import baseUrl from "./baseUrl";

export const getUserInfo = async () => {
  const path = 'https://api-mumul.site/v1/oauth/user/info';
  axios.defaults.withCredentials = true; // withCredentials 전역 설정

  try { 
    const response = await axios.get(path, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        withCredentials: true 
      },
      withCredentials: true ,
      // withCredentials: true,
      cache: 'no-cache', // 캐시를 비우는 옵션 추가
    })

    .then((result) => console.log(result.data));

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
