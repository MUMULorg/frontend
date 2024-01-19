import { customAxios } from "./customAxios";

export const putUserProfileEdit = async (currentUserId, formData) => {
    const path = '/v1/oauth/user/update/' + currentUserId;

    try {
        const response = await customAxios.put(path, formData, {
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