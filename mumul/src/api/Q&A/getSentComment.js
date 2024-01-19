import { customAxios } from "./../customAxios";

export const getSentComment = async (spaceId) => {
    const path = `/spaces/${spaceId}/sent/get`;

    try {
        const response = await customAxios.get(path,{
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