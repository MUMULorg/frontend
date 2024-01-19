import { customAxios } from "./customAxios";

export const logoutUserToken = async () => {
    const path = '/v1/oauth/logout';

    try {
        const response = await customAxios.post(`${path}`, null, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        localStorage.removeItem('token');

        // 응답이 성공적인지 확인
        if (response.status !== 200) {
            throw new Error('서버 상태가 이상합니다.');
        }
        
        // 성공적으로 요청을 처리한 경우 true 반환
        return true;
    } catch (e) {
        // 오류가 발생한 경우 에러 메시지를 출력하고 false를 반환
        console.error('postLogout 오류: ', e.message);
        
        return false;
    }
};
