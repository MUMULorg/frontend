import axios from "axios";

export const getFollowingList = async (spaceId) => {
  try {
    const token = localStorage.getItem('token');

    if(spaceId===''){
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

    return response.data.data;
    }

    } catch (e) {
        console.error('getFollowingList Error: ', e.message);
    }
};