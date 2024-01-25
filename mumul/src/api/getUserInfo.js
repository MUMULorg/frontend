import axios from "axios";



export const getUserInfo = async () => {
  const path = "https://api-mumul.site/v1/oauth/user/info";

  try {
    const response = await axios.get(path, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Credentials':"true",
        'Cache-Control': 'no-store',
        Pragma: 'no-store',
        Expires: '0'

      },
      cache: 'no-cache' // 캐시를 비우는 옵션 추가
    });

    if (response.status !== 200) {
      throw new Error('bad server condition');
    }
    console.log("getUserInfo 로그인 여부: ", response);
    return response.data; // response.data로 수정

  } catch (e) {
    console.error('getUserInfo Error: ', e.message);
    return false;
  }
};
