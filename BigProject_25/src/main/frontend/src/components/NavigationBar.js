// src/components/NavigationBar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavigationBar.css';

function NavigationBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <div className="home-navi">
            <div className="home-left-side">
                <Link to='/ServiceIntro' className="home-left-side-text">서비스소개</Link>
                <Link to='/Procedure' className="home-left-side-text">수속과정안내</Link>
                <Link to='/Items' className="home-left-side-text">반입물품안내</Link>
                <Link to='/Lost' className="home-left-side-text">분실물찾기</Link>
            </div>
            <a href='/' className='main-logo'>
                <img src="/images/main_logo.png" alt="logo"/>
            </a>
            <div className="home-right-side">
                <Link to='/' className="home-right-side-text">분실물등록</Link>
                <Link to='/Taxi' className="home-right-side-text">택시승강장관리</Link>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="home-right-side-text">로그아웃</button>
                ) : (
                    <Link to='/Login' className="home-right-side-text">로그인</Link>
                )}
            </div>
        </div>
    );
}

export default NavigationBar;
