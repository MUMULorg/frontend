import axios from "axios";

export const getIsFollower = async (spaceId) => {
  try {
    console.log("getIsFollower spaceId: ",spaceId);
    const path = `https://api-mumul.site/isFollower/${spaceId}`;
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

        console.log("getIsFollow 데이터: ", response.data);

        return response.data;
    } catch (e) {
        console.error('getIsFollow Error: ', e.message);
        return false;
    }
};