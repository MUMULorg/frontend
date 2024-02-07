import axios from "axios";

export const getFollwerNumber = async (spaceId) => {
  try {
    const token = localStorage.getItem('token');

    if(spaceId ===''){
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

      return response.data;
    }

  } catch (e) {
    console.error('getFollowerNumber Error: ', e.message);
    return false;
  }
};