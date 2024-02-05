import axios from "axios";

export const getFollowingList = async (spaceId) => {
  try {
    const path = `https://api-mumul.site/getFollow/following/${spaceId}`;
    const token = localStorage.getItem('token');

    if(spaceId==''){
      console.log("겟팔로잉리스트 spaceId 빔");
      return false;
    }else{
      const response = await axios.get(`https://api-mumul.site/getFollow/following/${spaceId}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        }
      });

      if (response.status !== 200) {
        throw new Error('bad server condition');
      }

      console.log("getFollowingList 데이터: ", response.data);

    return response.data.data;
    }

    } catch (e) {
        console.error('getFollowingList Error: ', e.message);
    }
};