import { customAxios } from "./../customAxios";

export const putAlertSpace = async (currentUserId, alertSpace) => {
    const path = '/v1/oauth/user/alertSpace/' + currentUserId;
    const token = localStorage.getItem('token');

  try {
    const response = await customAxios.put(path, alertSpace, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        }
      });

      return response.data;
  } catch (e) {
    console.error('putStopSpace Error: ', e.message);
  }
};

