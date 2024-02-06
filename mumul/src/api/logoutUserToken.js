import axios from "axios";

export const logoutUserToken = async () => {
    const path = 'https://api-mumul.site/v1/oauth/logout';

    try {
        const response = await axios.post('https://api-mumul.site/v1/oauth/logout', null, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        localStorage.removeItem('token');
        console.log("로그아웃 후에 token 삭제 확인: ", localStorage.getItem("token"));

        // 응답이 성공적인지 확인
        if (response.status !== 200) {
            throw new Error('서버 상태가 이상합니다.');
        }
        
        // 성공적으로 요청을 처리한 경우 true 반환
        return true;
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
