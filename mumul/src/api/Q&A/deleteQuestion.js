import axios from "axios";

export const deleteQuestion = async (spaceId, questionId, userId) => {
  try {

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
  } 
  
  catch (error) {
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
