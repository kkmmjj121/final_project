import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/Login.css';
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
// import '../../public/images';

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
        // 로그인 처리 로직
    };
    const onCaptchaChange = (value) => {
        setCaptchaValue(value);
    };
    const user = {
        userID: emailOrUsername,
        password: password,
        captchaResponse: captchaValue
    };

    axios.post('/auth/login', user, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

    })
        .then(response => {
            console.log('Success:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

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
                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                        </button>
                    </div>

                    <div className="form-group">
                        <ReCAPTCHA
                            sitekey="6LcX7hIqAAAAANwXNsGWClj7CFdauq4p-x4e_i7e" // 여기서 YOUR_SITE_KEY를 Google에서 받은 사이트 키로 변경하세요.
                            onChange={onCaptchaChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="login-button"
                        disabled={!emailOrUsername || !password}
                    >
                        <span>로그인</span>
                    </button>
                </form>

                <div className="login-links">
                    <Link to="/find-id-email" className="find-link">아이디를 잊어버리셨나요?</Link>
                    <Link to="/find-password" className="find-link">비밀번호를 잊어버리셨나요?</Link>
                </div>


                <div className="login-social">
                    <button className="social-button google-button">
                        <img src="/images/google_icon.png" alt="Google" className="social-icon"/>
                        Google로 시작하기
                    </button>
                    <button className="social-button kakao-button">
                        <img src="/images/kakao_icon.png" alt="Kakao" className="social-icon"/>
                        Kakao로 시작하기
                    </button>
                    <button className="social-button naver-button">
                        <img src="/images/naver_icon.png" alt="Naver" className="social-icon"/>
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
