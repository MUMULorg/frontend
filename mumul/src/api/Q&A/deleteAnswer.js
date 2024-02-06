import axios from "axios";

export const deleteAnswer = async (spaceId, answerId, userId) => {
  try {
  console.log(`spaceId는 ${spaceId}, answerId는 ${answerId} , userId는 ${userId}`);

    const path = `https://api-mumul.site/spaces/${spaceId}/${answerId}/${userId}/answer/delete`;

    const response = await axios.delete(
      `https://api-mumul.site/spaces/${spaceId}/${answerId}/${userId}/answer/delete`
      , {
      data: {
        userId: userId,
        spaceId: spaceId,
        answerId: answerId
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
    }
    );

    console.log("답변 삭제 response: ", response.data);
    return response.data;
  } catch (error) {

    if (error.response) {
      console.error('에러의 응답:', error.response);
      //do something

  } else if (error.request) {
      console.error('에러의 요청:', error.request);
      //do something else

  } else if (error.message) {
      console.error('에러의 메시지:', error.message);
      //do something other than the other two

  }
    return false;
  }
};
