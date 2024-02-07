import axios from "axios";

export const getSpaceInfo = async (spaceId) => {
  try {   
      if(spaceId ===''){
        return false;
      }else{
        const response = await axios.get(`https://api-mumul.site/spaces/${spaceId}`,{
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          }
        });

        if (response.status !== 200) {
          throw new Error('bad server condition');
        }

      return response.data;
      }

    } catch(e) {
        console.error('getSpaceInfo Error: ', e.message);
        return false;
    }
};