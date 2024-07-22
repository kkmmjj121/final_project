import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';

const OAuthRedirect = () => {
    const [authObj, setAuthObj] = useState(null); // 상태를 추가하여 authObj를 저장합니다

    useEffect(() => {
        const fetchAuthObj = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (!code) {
                console.error('Authorization code is missing');
                return;
            }

            try {
                // Access token을 요청
                const response = await axios.post('/oauth2/callback/kakao',
                    qs.stringify({ code }), // 코드 파라미터를 URL 쿼리로 보내기
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                );

                setAuthObj(response.data); // authObj를 상태에 저장합니다

            } catch (error) {
                console.error('액세스 토큰 요청 실패:', error);
                alert('OAuth 처리 실패: ' + (error.response?.data?.message || error.message));
            }
        };

        fetchAuthObj();
    }, []);

    useEffect(() => {
        if (authObj && authObj.access_token) {
            const fetchUserProfile = async () => {
                try {
                    // Access token 유효성 확인
                    const tokenResponse = await axios.get('https://kapi.kakao.com/v1/user/access_token_info', {
                        headers: {
                            'Authorization': `Bearer ${authObj.access_token}`
                        }
                    });
                    console.log('토큰 유효성 확인 성공:', tokenResponse.data);

                    // Backend로 전달
                    await axios.post('/auth/social-login',
                        qs.stringify({
                            provider: 'kakao',
                            token: authObj.access_token
                        }),
                        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                    );

                    // 홈 페이지로 리다이렉트
                    window.location.href = '/';
                } catch (error) {
                    console.error('OAuth 처리 실패:', error);
                    alert('OAuth 처리 실패: ' + (error.response?.data?.message || error.message));
                }
            };

            fetchUserProfile();
        }
    }, [authObj]); // authObj가 변경될 때마다 실행

    return (
        <div>OAuth 처리 중...</div>
    );
};

export default OAuthRedirect;
