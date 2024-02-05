import axios from "axios";

export const getFollowingNumber = async (spaceId) => {
  try {
    console.log("`````````````spaceId: ",spaceId);

    const path = `https://api-mumul.site/getFollow/followingNumber/${spaceId}`;
    const token = localStorage.getItem('token');

    if(spaceId==''){
      console.log("겟팔로잉넘버 spaceId 빔");
      return false;
    }else{
      const response = await axios.get(`https://api-mumul.site/getFollow/followingNumber/${spaceId}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
  
      if (response.status !== 200) {
        throw new Error('bad server condition');
      }
  
      console.log("getFollowingNumber 데이터: ", response.data);
  
      return response.data;
    }
  } catch (e) {
    console.error('getFollowingNumber Error: ', e.message);
    return false;
  }
};