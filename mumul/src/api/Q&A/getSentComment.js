import axios from "axios";

export const getSentComment = async (spaceId) => {
    try {
        const response = await axios.get(`https://api-mumul.site/spaces/${spaceId}/sent/get`,{
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
        });

        return response.data;
    } catch(e) {
        console.error('Error retrieving sent comments:', e.message);
        return false;
    }
};