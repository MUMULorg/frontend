import { customAxios } from "./../customAxios";

export const deleteUser = async (userId) => {
    const path = `/v1/oauth/user/secession/${userId}`;
    const token = localStorage.getItem('token');

    try {
        const response = await customAxios.delete(path, {
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