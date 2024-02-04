import axios from "axios";
export const getFollowerList = async (spaceId) => {
  try {
    console.log("겟팔로워리스트 spaceId: ", spaceId);
    const path = `https://api-mumul.site/getFollow/follower/${spaceId}`;
    const token = localStorage.getItem('token');

    
        const response = await axios.get(path, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer ' + token
            }
          });

          if (response.status !== 200) {
            throw new Error('bad server condition');
          }
  
          console.log("getFollowerList 데이터: ", response.data);
  

        return response.data.data;
    } catch (e) {
        console.error('getFollowerList Error: ', e.message);
    }
};