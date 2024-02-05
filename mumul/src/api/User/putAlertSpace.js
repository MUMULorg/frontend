import axios from "axios";

export const putAlertSpace = async (currentUserId, alertSpace) => {
  try {
    const path = `https://api-mumul.site/v1/oauth/user/alertSpace/${currentUserId}`;
    const token = localStorage.getItem('token');

    const response = await axios.put(`https://api-mumul.site/v1/oauth/user/alertSpace/${currentUserId}`, alertSpace, {
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

