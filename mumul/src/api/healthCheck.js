// Axios를 사용하는 경우
import axios from 'axios';

export const healthCheck = async () => {
  try {
    const response = await axios.get('/health'); // 헬스 체크를 수행할 엔드포인트
    console.log('Health Check Response:', response.data);
    // 여기에서 응답을 분석하고 필요한 동작을 수행할 수 있습니다.
  } catch (error) {
    console.error('Health Check Failed:', error.message);
    // 헬스 체크에 실패한 경우 에러를 처리합니다.
  }
};
