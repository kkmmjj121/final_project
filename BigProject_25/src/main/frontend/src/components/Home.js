// src/components/Home.js
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/Home.css';
import NavigationBar from "./NavigationBar";

let lastScrollTop = 0;

window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    let homeNavi = document.querySelector(".home-navi");

    if (homeNavi) {
        if (currentScroll > lastScrollTop) {
            homeNavi.style.top = "-80px"; // 네비게이션 바 높이만큼 숨김
        } else {
            homeNavi.style.top = "0";
        }
    }

    lastScrollTop = currentScroll;
});


function Home() {
    const [selectedNumber, setSelectedNumber] = useState(5);
    const [selectedNumber2, setSelectedNumber2] = useState(7);
    const [isNextScreen, setIsNextScreen] = useState(false);

    // 갱신 버튼 클릭 시 실행될 함수
    const handleRefreshClick = () => {
        // 1부터 60 사이의 랜덤 숫자 생성
        const randomNumber = Math.floor(Math.random() * 60) + 1;
        const randomNumber2 = Math.floor(Math.random() * 60) + 1;
        setSelectedNumber(randomNumber);
        setSelectedNumber2(randomNumber2);

    };

    const getImagePath = () => {
        if (selectedNumber >= 0 && selectedNumber <= 20) {
            return "/images/clean.png"; // 0부터 20 사이
        } else if (selectedNumber > 20 && selectedNumber <= 40) {
            return '/images/normal.png'; // 21부터 40 사이
        } else if (selectedNumber > 40 && selectedNumber <= 60) {
            return '/images/busy.png'; // 41부터 60 사이
        } else {
            return null; // 범위를 벗어나면 null 반환
        }
    };
    const getImagePath2 = () => {
        if (selectedNumber2 >= 0 && selectedNumber2 <= 20) {
            return "/images/clean.png"; // 0부터 20 사이
        } else if (selectedNumber2 > 20 && selectedNumber2 <= 40) {
            return '/images/normal.png'; // 21부터 40 사이
        } else if (selectedNumber2 > 40 && selectedNumber2 <= 60) {
            return '/images/busy.png'; // 41부터 60 사이
        } else {
            return null; // 범위를 벗어나면 null 반환
        }
    };
    const handleMoveClick = () => {
        setIsNextScreen(!isNextScreen); // isNextScreen 상태를 토글하여 화면 전환


    };

    return (
        <div className="home-div">
            <NavigationBar/>
            <div className="home-content">

                {isNextScreen ? (
                    <div className={`time-middle ${isNextScreen ? 'active' : 'inactive'}`}>
                        <div className="time-middle-title">
                            보안검색 소요시간
                        </div>
                        <div className="time-main-image">
                            <div className="time-image-container">
                                {selectedNumber2 && (
                                    <img
                                        className="time-image"
                                        src={getImagePath2()}
                                        alt={`Image for number ${selectedNumber2}`}
                                    />
                                )}
                                <div className="time-time-container">
                                    <span className="time-time-span">
                                        {selectedNumber2}
                                    </span>
                                    <span className="time-time-span2">
                                        분
                                    </span>
                                </div>
                                <button className="time-move-btn2" onClick={handleMoveClick}>
                                    <img
                                        className="time-next"
                                        src="/images/Arrow_drop_left@3x.png"
                                        alt="next"
                                    />
                                </button>
                            </div>
                            <button className="time-btn-frame" onClick={handleRefreshClick}>
                                <div className="time-btn-text">수속시간 갱신</div>
                                <img
                                    className="time-refresh"
                                    src="/images/refresh.png"
                                    alt="refresh"
                                />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={`time-middle ${isNextScreen ? 'active' : 'inactive'}`}>
                        <div className="time-middle-title">
                            체크인 소요시간
                        </div>
                        <div className="time-main-image">
                            <div className="time-image-container">
                                {selectedNumber && (
                                    <img
                                        className="time-image"
                                        src={getImagePath()}
                                        alt={`Image for number ${selectedNumber}`}
                                    />
                                )}
                                <div className="time-time-container">
                                    <span className="time-time-span">
                                        {selectedNumber}
                                    </span>
                                    <span className="time-time-span2">
                                        분
                                    </span>
                                </div>
                                <button className="time-move-btn" onClick={handleMoveClick}>
                                    <img
                                        className="time-next"
                                        src="/images/Arrow_drop_right@3x.png"
                                        alt="next"
                                    />
                                </button>
                            </div>
                            <button className="time-btn-frame" onClick={handleRefreshClick}>
                                <div className="time-btn-text">수속시간 갱신</div>
                                <img
                                    className="time-refresh"
                                    src="/images/refresh.png"
                                    alt="refresh"
                                />
                            </button>
                        </div>
                    </div>
                )}
                <div className="home-sub-content-1">
                    <div className="home-sub-content-1-description">
                        <img className="home-sub-content-1-rect" src="/images/main_star.png"/>
                        <div className="home-sub-content-1-text">승객분들께서 많이 찾으시는 서비스</div>
                    </div>
                    <div className="home-sub-content-1-main">
                        <div className="home-sub-content-1-line">
                            <a href='/ServiceIntro' className="home-sub-content-1-container">
                                <div className="home-sub-content-1-container-description">
                                    <div className="home-sub-content-1-container-text-1">서비스소개</div>
                                    <div className="home-sub-content-1-container-right">
                                        <img className="home-sub-content-1-container-image"
                                             src="/images/main_sub_plane.png"/>
                                        <div className="home-arrow-box">
                                            <img
                                                className="home-arrow-narrow-right"
                                                src="/images/arrow_narrow_right.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <Link to='/Procedure' className="home-sub-content-1-container">
                                <div className="home-sub-content-1-container-description">
                                    <div className="home-sub-content-1-container-text-1">수속과정안내</div>
                                    <div className="home-sub-content-1-container-right">
                                        <img className="home-sub-content-1-container-image"
                                             src="/images/main_sub_ticket.png"/>
                                        <div className="home-arrow-box">
                                            <img
                                                className="home-arrow-narrow-right"
                                                src="/images/arrow_narrow_right.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="home-sub-content-1-line">
                            <Link to='/' className="home-sub-content-1-container">
                                <div className="home-sub-content-1-container-description">
                                    <div className="home-sub-content-1-container-text-1">반입물품안내</div>
                                    <div className="home-sub-content-1-container-right">
                                        <img className="home-sub-content-1-container-image"
                                             src="/images/main_sub_bag.png"/>
                                        <div className="home-arrow-box">
                                            <img
                                                className="home-arrow-narrow-right"
                                                src="/images/arrow_narrow_right.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to='/' className="home-sub-content-1-container">
                                <div className="home-sub-content-1-container-description">
                                    <div className="home-sub-content-1-container-text-1">분실물찾기</div>
                                    <div className="home-sub-content-1-container-right">
                                        <img className="home-sub-content-1-container-image"
                                             src="/images/main_sub_luggage.png"/>
                                        <div className="home-arrow-box">
                                            <img
                                                className="home-arrow-narrow-right"
                                                src="/images/arrow_narrow_right.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="home-sub-content-2">
                    <div className="home-sub-content-2-main">
                        <img className="home-sub-content-2-rect" src="/images/main_cursor.png"/>
                        <div className="home-sub-content-2-text">대구공항 소식</div>
                    </div>
                    <div className="home-sub-content-2-container">
                        <div className="home-sub-content-2-container-description">
                            <div className="home-sub-content-2-container-description-top">
                                <div className="home-sub-content-2-container-description-top-container">
                                    <div className="home-article">
                                        <div className="home-article-top">
                                            <div className="home-article-top-left">
                                                <div className="home-bell-box">
                                                    <img className="home-bell" src="/images/bell.png"/>
                                                </div>
                                                <div className="home-broad-text-box">
                                                    <div className="home-broad-text">보도자료</div>
                                                </div>
                                                <div className="home-sub-container-2-date">2024.07.15</div>
                                            </div>
                                            <img className="home-dots-vertical" src="/images/dots-vertical.png"/>
                                        </div>
                                        <div className="home-article-title">
                                            [단독] 동북아 허브 꿈꾼다…대구공항,
                                            <br/>
                                            환승시설 구축 추진
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img
                                className="home-sub-content-2-container-description-image"
                                src="/images/article_image(temp).png"
                            />
                        </div>
                        <div className="home-sub-content-2-container-description">
                            <div className="home-sub-content-2-container-description-top">
                                <div className="home-sub-content-2-container-description-top-container">
                                    <div className="home-article">
                                        <div className="home-article-top">
                                            <div className="home-article-top-left">
                                                <div className="home-bell-box">
                                                    <img className="home-bell" src="/images/bell.png"/>
                                                </div>
                                                <div className="home-broad-text-box">
                                                    <div className="home-broad-text">보도자료</div>
                                                </div>
                                                <div className="home-sub-container-2-date">2024.07.15</div>
                                            </div>
                                            <img className="home-dots-vertical" src="/images/dots-vertical.png"/>
                                        </div>
                                        <div className="home-article-title">
                                            [단독] 동북아 허브 꿈꾼다…대구공항,
                                            <br/>
                                            환승시설 구축 추진
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img
                                className="home-sub-content-2-container-description-image"
                                src="/images/article_image(temp).png"
                            />
                        </div>
                        <div className="home-sub-content-2-container-description">
                            <div className="home-sub-content-2-container-description-top">
                                <div className="home-sub-content-2-container-description-top-container">
                                    <div className="home-article">
                                        <div className="home-article-top">
                                            <div className="home-article-top-left">
                                                <div className="home-bell-box">
                                                    <img className="home-bell" src="/images/bell.png"/>
                                                </div>
                                                <div className="home-broad-text-box">
                                                    <div className="home-broad-text">보도자료</div>
                                                </div>
                                                <div className="home-sub-container-2-date">2024.07.15</div>
                                            </div>
                                            <img className="home-dots-vertical" src="/images/dots-vertical.png"/>
                                        </div>
                                        <div className="home-article-title">
                                            [단독] 동북아 허브 꿈꾼다…대구공항,
                                            <br/>
                                            환승시설 구축 추진
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img
                                className="home-sub-content-2-container-description-image"
                                src="/images/article_image(temp).png"
                            />
                        </div>
                    </div>
                    <div className="home-sub-content-2-bottom">
                        <div className="home-sub-content-2-box">
                            <div className="home-sub-content-2-description">
                                <div className="home-sub-content-2-text2">전체뉴스</div>
                                <Link to='/' className="home-sub-content-2-link">
                                    <div className="home-sub-content-2-link-text">바로가기</div>
                                    <img className="home-arrow-narrow-right5"
                                         src="/images/arrow-narrow-right(black).png"/>
                                </Link>
                            </div>
                        </div>
                        <div className="home-sub-content-2-box">
                            <div className="home-sub-content-2-description">
                                <div className="home-sub-content-2-text2">보도자료</div>
                                <Link to='/' className="home-sub-content-2-link">
                                    <div className="home-sub-content-2-link-text">바로가기</div>
                                    <img className="home-arrow-narrow-right5"
                                         src="/images/arrow-narrow-right(black).png"/>
                                </Link>
                            </div>
                        </div>
                        <div className="home-sub-content-2-box">
                            <div className="home-sub-content-2-description">
                                <div className="home-sub-content-2-text2">참고자료</div>
                                <Link to='/' className="home-sub-content-2-link">
                                    <div className="home-sub-content-2-link-text">바로가기</div>
                                    <img className="home-arrow-narrow-right5"
                                         src="/images/arrow-narrow-right(black).png"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-footer">
                <div className="home-footer-content"></div>
            </div>
        </div>


    );
}

export default Home;