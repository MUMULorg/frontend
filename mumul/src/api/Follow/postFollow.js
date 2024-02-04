import axios from "axios";

export const postFollow = async (spaceId) => {
  try {
  console.log("getIsFollow spaceId: ",spaceId);
    const path = `https://api-mumul.site/follow/${spaceId}`;
    const token = localStorage.getItem('token');

        const response = await axios.post(path, {}, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
          }
        });

        if (response.status !== 200) {
          throw new Error('bad server condition');
        }

        console.log("postFollow 데이터: ", response.data);

        return response.data;
    } catch (e) {
        console.error('postFollow Error: ', e.message);
    }
}

