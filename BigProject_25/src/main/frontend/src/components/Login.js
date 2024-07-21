// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import '../styles/Login.css';
// import axios from "axios";
// import qs from 'qs';
// import ReCAPTCHA from "react-google-recaptcha";
//
// const Login = () => {
//     const [emailOrUsername, setEmailOrUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();
//     const [captchaValue, setCaptchaValue] = useState(null);
//
//     const handleEmailOrUsernameChange = (e) => {
//         setEmailOrUsername(e.target.value);
//     };
//
//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//
//         if (!captchaValue) {
//             alert("Captcha를 확인해주세요.");
//             return;
//         }
//
//         const user = {
//             userID: emailOrUsername,
//             password: password,
//             captchaResponse: captchaValue
//         };
//
//         axios.post('/auth/login', qs.stringify(user), {
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         })
//             .then(response => {
//                 console.log('Success:', response.data);
//                 // 로그인 성공 후의 처리
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 // 로그인 실패 시의 처리
//             });
//     };
//
//     const onCaptchaChange = (value) => {
//         setCaptchaValue(value);
//     };
//
//     useEffect(() => {
//         const loadKakaoSDK = () => {
//             return new Promise((resolve, reject) => {
//                 const script = document.createElement('script');
//                 script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
//                 script.onload = () => {
//                     if (window.Kakao) {
//                         window.Kakao.init('d34e9b7ffd72249b06fccc94be11405b'); // 여기에 실제 JavaScript 키를 입력하세요.
//                         resolve(window.Kakao);
//                     } else {
//                         reject(new Error('Kakao SDK 로드 실패'));
//                     }
//                 };
//                 script.onerror = () => reject(new Error('Kakao SDK 로드 실패'));
//                 document.head.appendChild(script);
//             });
//         };
//
//         loadKakaoSDK().then(() => {
//             console.log('Kakao SDK 로드 및 초기화 성공');
//         }).catch((error) => {
//             console.error(error);
//         });
//     }, []);
//
//     const loginWithKakao = () => {
//         if (!window.Kakao) {
//             console.error('Kakao SDK가 초기화되지 않았습니다.');
//             return;
//         }
//
//         window.Kakao.Auth.login({
//             success: async (authObj) => {
//                 console.log(authObj);
//                 try {
//                     const response = await axios.post('/auth/social-login', qs.stringify({
//                         provider: 'kakao',
//                         token: authObj.access_token
//                     }), {
//                         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//                     });
//                     if (response.status === 200) {
//                         console.log('소셜 로그인 성공');
//                     }
//                 } catch (error) {
//                     console.error('소셜 로그인 실패', error);
//                 }
//             },
//             fail: (err) => {
//                 console.error(err);
//             },
//         });
//     };
//
//     return (
//         <div className="login-full-container">
//             <Link to="/">
//                 <img src="/images/main_logo.png" alt="AIrport 로고" className="login-home-logo" />
//             </Link>
//             <div className="login-container">
//                 <h1 className="login-title">로그인</h1>
//                 <form className="login-form" onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label className="input-label">아이디 입력</label>
//                         <input
//                             type="text"
//                             placeholder="아이디를 입력해주세요."
//                             className="login-input"
//                             value={emailOrUsername}
//                             onChange={handleEmailOrUsernameChange}
//                         />
//                     </div>
//
//                     <div className="form-group">
//                         <label className="input-label">비밀번호 입력</label>
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             placeholder="비밀번호를 입력해주세요."
//                             className="login-input"
//                             value={password}
//                             onChange={handlePasswordChange}
//                         />
//                         <button
//                             type="button"
//                             className="login-show-hide-button"
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </button>
//                     </div>
//
//                     <div className="form-group">
//                         <ReCAPTCHA
//                             sitekey="6LcX7hIqAAAAANwXNsGWClj7CFdauq4p-x4e_i7e" // 여기서 YOUR_SITE_KEY를 Google에서 받은 사이트 키로 변경하세요.
//                             onChange={onCaptchaChange}
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="login-button"
//                         disabled={!emailOrUsername || !password || !captchaValue}
//                     >
//                         <span>로그인</span>
//                     </button>
//                 </form>
//
//                 <div className="login-links">
//                     <Link to="/find-id-email" className="find-link">아이디를 잊어버리셨나요?</Link>
//                     <Link to="/find-password" className="find-link">비밀번호를 잊어버리셨나요?</Link>
//                 </div>
//
//                 <div className="login-social">
//                     <button className="social-button google-button">
//                         <img src="/images/google_icon.png" alt="Google" className="social-icon" />
//                         Google로 시작하기
//                     </button>
//                     <button className="social-button kakao-button" onClick={loginWithKakao}>
//                         <img src="/images/kakao_icon.png" alt="Kakao" className="social-icon" />
//                         Kakao로 시작하기
//                     </button>
//
//                     <button className="social-button naver-button">
//                         <img src="/images/naver_icon.png" alt="Naver" className="social-icon" />
//                         Naver로 시작하기
//                     </button>
//                 </div>
//
//                 <div className="signup-link">
//                     아직 회원이 아니신가요? 지금 <Link to="/signup">회원가입</Link> 하세요!
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Login;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/Login.css';
import axios from "axios";
import qs from 'qs';
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleEmailOrUsernameChange = (e) => {
        setEmailOrUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!captchaValue) {
            alert("Captcha를 확인해주세요.");
            return;
        }

        const user = {
            userID: emailOrUsername,
            password: password,
            captchaResponse: captchaValue
        };

        axios.post('/auth/login', qs.stringify(user), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
            .then(response => {
                console.log('Success:', response.data);
                // 로그인 성공 시 토큰을 로컬 스토리지에 저장
                localStorage.setItem('token', response.data.token);
                navigate('/'); // 홈 페이지로 리다이렉트
            })
            .catch(error => {
                console.error('Error:', error);
                alert('로그인 실패: ' + (error.response?.data?.message || error.message));
            });
    };

    const onCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    useEffect(() => {
        const loadKakaoSDK = () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
                script.onload = () => {
                    if (window.Kakao) {
                        window.Kakao.init('b7460a5f188beb205d56560fa8ef7c45'); // 여기에 실제 JavaScript 키를 입력하세요.
                        resolve(window.Kakao);
                    } else {
                        reject(new Error('Kakao SDK 로드 실패'));
                    }
                };
                script.onerror = () => reject(new Error('Kakao SDK 로드 실패'));
                document.head.appendChild(script);
            });
        };

        loadKakaoSDK().then(() => {
            console.log('Kakao SDK 로드 및 초기화 성공');
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const loginWithKakao = () => {
        if (!window.Kakao) {
            console.error('Kakao SDK가 초기화되지 않았습니다.');
            return;
        }

        window.Kakao.Auth.login({
            scope: 'profile_nickname, account_email', // 필요한 권한 추가
            success: async (authObj) => {
                console.log('카카오 인증 응답:', authObj);

                try {
                    const tokenResponse = await axios.get('https://kapi.kakao.com/v1/user/access_token_info', {
                        headers: {
                            'Authorization': `Bearer ${authObj.access_token}`
                        }
                    });
                    console.log('토큰 유효성 확인 성공:', tokenResponse.data);

                    // Backend로 전달
                    const response = await axios.post('/auth/social-login', qs.stringify({
                        provider: 'kakao',
                        token: authObj.access_token
                    }), {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    });
                    if (response.status === 200) {
                        console.log('소셜 로그인 성공');
                        localStorage.setItem('token', response.data.token);  // 소셜 로그인 성공 시 토큰 저장
                        navigate('/'); // 로그인 성공 시 홈 페이지로 리다이렉트
                    }
                } catch (error) {
                    console.error('소셜 로그인 실패', error);
                    alert('소셜 로그인 실패: ' + (error.response?.data?.message || error.message));
                }
            },
            fail: (err) => {
                console.error(err);
                alert('카카오 로그인 실패: ' + err.error_description);
            },
        });
    };

    return (
        <div className="login-full-container">
            <Link to="/">
                <img src="/images/main_logo.png" alt="AIrport 로고" className="login-home-logo" />
            </Link>
            <div className="login-container">
                <h1 className="login-title">로그인</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="input-label">아이디 입력</label>
                        <input
                            type="text"
                            placeholder="아이디를 입력해주세요."
                            className="login-input"
                            value={emailOrUsername}
                            onChange={handleEmailOrUsernameChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="input-label">비밀번호 입력</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="비밀번호를 입력해주세요."
                            className="login-input"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button
                            type="button"
                            className="login-show-hide-button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="form-group">
                        <ReCAPTCHA
                            sitekey="6LcX7hIqAAAAANwXNsGWClj7CFdauq4p-x4e_i7e" // 실제 Google에서 받은 사이트 키로 변경하세요.
                            onChange={onCaptchaChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="login-button"
                        disabled={!emailOrUsername || !password || !captchaValue}
                    >
                        <span>로그인</span>
                    </button>
                </form>

                <div className="login-links">
                    <Link to="/IdInquiry" className="find-link">아이디를 잊어버리셨나요?</Link>
                    <Link to="/PwInquiry" className="find-link">비밀번호를 잊어버리셨나요?</Link>
                </div>

                <div className="login-social">
                    <button className="social-button google-button">
                        <img src="/images/google_icon.png" alt="Google" className="social-icon" />
                        Google로 시작하기
                    </button>
                    <button className="social-button kakao-button" onClick={loginWithKakao}>
                        <img src="/images/kakao_icon.png" alt="Kakao" className="social-icon" />
                        Kakao로 시작하기
                    </button>

                    <button className="social-button naver-button">
                        <img src="/images/naver_icon.png" alt="Naver" className="social-icon" />
                        Naver로 시작하기
                    </button>
                </div>

                <div className="signup-link">
                    아직 회원이 아니신가요? 지금 <Link to="/signup">회원가입</Link> 하세요!
                </div>
            </div>
        </div>
    );
};

export default Login;

