import axios from "axios";

export const postUnFollow = async (spaceId) => {
  try {
    const path = `https://api-mumul.site/unFollow/${spaceId}`;
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
  
      console.log("postUnFollow 데이터: ", response.data);
  
        return response.data;
    } catch (e) {
        console.error('postFollow Error: ', e.message);
    }
}

