import axios from "axios";

export const getSpaceInfo = async (spaceId) => {
  console.log("getspaceinfo: ",spaceId);
    const path = `https://api-mumul.site/spaces/${spaceId}`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(path,{
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
          });
        return response.data;
    } catch(e) {
        console.error('getSpaceInfo Error: ', e.message);
        return false;
    }
};