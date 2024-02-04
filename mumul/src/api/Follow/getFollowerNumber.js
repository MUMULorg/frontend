import axios from "axios";

export const getFollwerNumber = async (spaceId) => {
  try {
    const path = `https://api-mumul.site/getFollow/followerNumber/${spaceId}`;
    const token = localStorage.getItem('token');

    if(spaceId ==''){
      console.log("spaceInfo의 spaceId가 '' 여서 스페이스 못 불러옴;;")
      return false;
    }
    else{
      const response = await axios.get(`https://api-mumul.site/getFollow/followerNumber/${spaceId}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
  
      
      if (response.status !== 200) {
        throw new Error('bad server condition');
      }
      console.log("getFollowerNumber 데이터: ", response.data);

      return response.data;
    }

  } catch (e) {
    console.error('getFollowerNumber Error: ', e.message);
    return false;
  }
};