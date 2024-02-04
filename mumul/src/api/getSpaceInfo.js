import axios from "axios";

export const getSpaceInfo = async (spaceId) => {
  try {
  console.log("getspaceinfo: ",spaceId);
    const path = `https://api-mumul.site/spaces/${spaceId}`;
    const token = localStorage.getItem('token');
    console.log("getSpaceInfo token: ", localStorage.getItem('token'));

   
      if(spaceId ==''){
        console.log("spaceInfo의 spaceId가 '' 여서 스페이스 못 불러옴;;")
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

        console.log("getSpaceInfo 데이터: ", response.data);

      return response.data;
      }

    } catch(e) {
        console.error('getSpaceInfo Error: ', e.message);
        return false;
    }
};