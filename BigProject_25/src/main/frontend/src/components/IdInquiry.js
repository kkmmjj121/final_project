import '../styles/IdInquiry.css';
import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const IdInquiry = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState(''); // 응답 메시지를 저장할 상태 변수
    const [isVisible, setIsVisible] = useState(false); // 팝업창 안보이게
    const navigate = useNavigate();


    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleUserEmailChange = (e) => {
        setUserEmail(e.target.value);
    };

    // 팝업 > 홈페이지 버튼
    const handleGoHome = () => {
        navigate('/');
    };

    // 엔터로 버튼 누르기
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Enter 키로 기본 동작 방지 (예: 폼 제출 등)
            handleSubmit(); // 버튼 클릭 이벤트 처리
        }
    };
    useEffect(() => {
        // 키다운 이벤트 리스너 추가
        window.addEventListener('keydown', handleKeyDown);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    // axios 요청
    const handleSubmit = () => {

        // 팝업창 보이게
        setIsVisible(true);

        // axios에 전송할 데이터
        const data = {
            username: userName,
            email: userEmail
        };

        axios.post('API주소여기다가', data)
            .then(response => {
                console.log('성공적으로 전송됨:', response.data);
            })
            .catch(error => {
                console.error('전송 중 에러 발생:', error);
            });
    };


    return (
        // 화면 전체 범위
        <div className="idinquiry">

            {/*서비스 영역*/}
            <div className="id-inquiry-content">

                {/*로고 영역*/}
                <div className="logo">
                    <div className="a-irport">AIrport</div>
                </div>

                {/*서비스 설명 영역*/}
                <div className="find-id-title">
                    <div className="div3">아이디 찾기</div>
                    <div className="line-32"></div>
                    <div className="div4">
                        아이디를 찾기 위해서 회원님의 이름과 가입할 때 사용한 이메일을 입력해주세요
                    </div>
                </div>

                {/*사용자 이름 입력받기*/}
                <div className="find-id-username">
                    <div className="user-name">USER NAME</div>
                    <div className="user-name-input">
                        <input
                            className="input-username"
                            type="text"
                            name="username"
                            value={userName}
                            placeholder="회원 이름"
                            onChange={handleUserNameChange}
                        />
                    </div>
                </div>

                {/*사용자 이메일 입력받기*/}
                <div className="find-id-useremail">
                    <div className="user-email">USER EMAIL</div>
                    <div className="user-email-input">
                        <input
                            className="input-useremail"
                            type="email"
                            name="userEmail"
                            value={userEmail}
                            placeholder="이메일 입력"
                            onChange={handleUserEmailChange}
                        />
                    </div>
                </div>

                {/*버튼 + 백엔드에 요청 보내기*/}
                <button onClick={handleSubmit} className="find-id-btn">
                    <div className="div">아이디 찾기</div>
                </button>
            </div>

            {/*전체화면과 크기 같은 프레임(배경 어둡게 하기 위해서 제공)*/}
            {/*<div className="IdInquiry-popup-frame">*/}
            <div className={isVisible ? 'IdInquiry-popup-frame' : 'hidden'}>

                {/*팝업 창*/}
                <div className="IdInquiry-popup">

                    {/*팝업창 로고*/}
                    <div className="IdInquiry-popup-logo">
                        <div className="IdInquiry-popup-a-irport">AIrport</div>
                    </div>

                    {/*팝업 서비스 영역*/}
                    <div className="IdInquiry-popup-explain">


                        {/*아이디 찾기 결과*/}
                        <div className="IdInquiry-popup-offer">
              <span>

                {/*회원이름 적용*/}
                  <span className="IdInquiry-popup-offer-text">
                  {userName} 님의 아이디는<br/>
                </span>

                  {/*사용자 아이디 + 일부 검열*/}
                  <span className="IdInquiry-popup-offer-userid">as***23</span>
                <span className="IdInquiry-popup-offer-text">입니다</span>
              </span>
                        </div>

                        {/*개인정보 보호 설명*/}
                        <div className="IdInquiry-popup-explain-sub">
                            개인정보 보호를 위해<br/>
                            아이디의 일부만 제공됩니다.
                        </div>
                    </div>

                    {/*팝업창 닫기 + 홈페이지로 돌아가기*/}
                    <div className="IdInquiry-popup-btn" onClick={handleGoHome}>
                        <div className="IdInquiry-popup-btn-text">홈페이지로 돌아가기</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IdInquiry;