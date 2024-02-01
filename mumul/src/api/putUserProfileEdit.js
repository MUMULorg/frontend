import axios from "axios";

export const putUserProfileEdit = async (currentUserId, formData) => {
    const path = 'https://api-mumul.site/v1/oauth/user/update/' + currentUserId;

    try {
        const response = await axios.put(path, formData, {
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