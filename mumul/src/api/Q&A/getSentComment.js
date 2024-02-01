import axios from "axios";

export const getSentComment = async (spaceId) => {
    const path = `https://api-mumul.site/spaces/${spaceId}/sent/get`;

    try {
        const response = await axios.get(path,{
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