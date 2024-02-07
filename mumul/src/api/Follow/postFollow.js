import axios from "axios";

export const postFollow = async (spaceId) => {
  try {
    const token = localStorage.getItem('token');

        const response = await axios.post(`https://api-mumul.site/follow/${spaceId}`, {}, {
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
    } catch (e) {
        console.error('postFollow Error: ', e.message);
    }
}

