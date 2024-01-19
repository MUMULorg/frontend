import { customAxios } from "./../customAxios";

export const getIsFollow = async (spaceId) => {
    const path = `/isFollow/${spaceId}`;
    const token = localStorage.getItem('token');

    try {
        const response = await customAxios.get(path, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
          }
        });

        return response.data;
    } catch (e) {
        console.error('getIsFollow Error: ', e.message);
        return false;
    }
};