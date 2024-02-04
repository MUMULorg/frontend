import axios from "axios";

export const deleteUser = async (userId) => {
  try {
  const path = `https://api-mumul.site/v1/oauth/user/secession/${userId}`;
    const token = localStorage.getItem('token');
    
        const response = await axios.delete(path, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer ' + token
            }
          });

        localStorage.removeItem('token');

        return response.data;
    } catch (e) {
        console.error('deletUser Error: ', e.message);
    }
}