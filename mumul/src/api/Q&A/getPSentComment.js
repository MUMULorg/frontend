import axios from "axios";

export const getPSentComment = async (spaceId, page, pageSize) => {
    try {
        const response = await axios.get(`https://api-mumul.site/spaces/${spaceId}/sent/get?page=${page}&size=${pageSize}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

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