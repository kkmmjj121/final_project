// src/components/NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavigationBar.css';

function NavigationBar() {
    return (
        <div className="home-navi">
            <div className="home-left-side">
                <a href='/ServiceIntro' className="home-left-side-text">서비스소개</a>
                <a href='/Procedure' className="home-left-side-text">수속과정안내</a>
                <a href='/Items' className="home-left-side-text">반입물품안내</a>
                <a href='/Lost' className="home-left-side-text">분실물찾기</a>
            </div>
            <a href='/' className='main-logo'>
                <img src="/images/main_logo.png" alt="logo"/>
            </a>
            <div className="home-right-side">
                <a href='/Management' className="home-right-side-text">분실물관리</a>
                <a href='/Taxi' className="home-right-side-text">택시승강장관리</a>
                <a href='/Login' className="home-right-side-text">로그인</a>
            </div>
        </div>
    );
}

export default NavigationBar;
