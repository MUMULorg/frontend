import axios from "axios";

export const deleteQuestion = async (spaceId, questionId, userId) => {
  try {
    const path = `https://api-mumul.site/spaces/${spaceId}/${questionId}/${userId}/question/delete`;

    const response = await axios.delete(
      `https://api-mumul.site/spaces/${spaceId}/${questionId}/${userId}/question/delete`
      , {
        data: {
          userId: userId,
          spaceId: spaceId,
          questionId: questionId
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
      }


    );

    return response.data;
  } catch (e) {
    console.error('Error deleting received comments:', e.message);
    return false;
  }
};
