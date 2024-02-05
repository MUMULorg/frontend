import axios from "axios";

export const putUserProfileEdit = async (currentUserId, formData) => {
    try {
    const path = `https://api-mumul.site/v1/oauth/user/update/${currentUserId}`;

        const response = await axios.put(`https://api-mumul.site/v1/oauth/user/update/${currentUserId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        
        return response.data;
    } catch(error) {
        console.error(error);
    }
}; 