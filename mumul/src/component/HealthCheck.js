// HealthCheck.js
import React, { useState, useEffect } from 'react';
import { healthCheck } from '../api/healthCheck'; // `yourHealthCheckModule`에 실제 모듈 위치를 지정해야 합니다.

const HealthCheck = () => {
  const [isServerOnline, setServerOnline] = useState(false);

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        await healthCheck(); // healthCheck 함수 호출
        setServerOnline(true);
      } catch (error) {
        setServerOnline(false);
      }
    };

    checkServerHealth();
    const intervalId = setInterval(checkServerHealth, 5000); //5초 간격으로 헬스체크 

    return () => clearInterval(intervalId);

  }, []);

  return (
    <div>
      {isServerOnline ? (
        <p>서버가 온라인 상태입니다.</p>
      ) : (
        <p>서버에 연결할 수 없습니다.</p>
      )}
    </div>
  );
};

export default HealthCheck;
