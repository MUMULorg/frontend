import axios from "axios";

export const getFollowingList = async (spaceId) => {
  try {
    const path = `https://api-mumul.site/getFollow/following/${spaceId}`;
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
  
          console.log("getFollowingList 데이터: ", response.data);

        return response.data.data;
    } catch (e) {
        console.error('getFollowingList Error: ', e.message);
    }
};