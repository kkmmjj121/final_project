import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Taxi.css';
import NavigationBar from '../components/NavigationBar';
import {BabyChangingStation} from "@mui/icons-material";

function Taxi(){
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };
    const [isOn2, setIsOn2] = useState(false);

    const handleToggle2 = () => {
        setIsOn2(!isOn2);
    };
    return(
        <div className="taxi-div">
            <NavigationBar/>
            <div className="taxi-entire">
                <div className="taxi-top">
                    <div className="taxi-subtitle">service monitorling</div>
                    <div className="taxi-title">택시 승강장 관리서비스 실시간 모니터링</div>
                    <div className="taxi-title-explain">
                        대기승객 수를 감지해 자동으로 택시를 호출합니다
                    </div>
                </div>
                <div className="taxi-main">
                    <div className="taxi-middle">
                        <div className="taxi-video-frame">
                            <div className="taxi-live">
                                <div className="taxi-red"></div>
                                <div className="taxi-live-text">Live</div>
                            </div>
                            <div className="taxi-effect">
                                <div className="taxi-effect-text">Effects : On</div>
                            </div>
                        </div>
                        <div className="taxi-middle-right">
                            <div className="taxi-waiting">
                                <div className="taxi-waiting-frame">
                                    <div className="taxi-waiting-container">
                                        <div className="taxi-waiting-container-left">
                                            <div className="taxi-waiting-text">대기승객</div>
                                            <div className="taxi-waiting-image">
                                                <div
                                                    className="taxi-user-multiple-group-close-geometric-human-multiple-person-up-user"
                                                >
                                                    <img
                                                        className="taxi-user-multiple-group-close-geometric-human-multiple-person-up-user2"
                                                        src="/images/multi-user.png"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="taxi-number">
                                            <div className="taxi-digit">8</div>
                                            <div className="taxi-span">명</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="taxi-waiting-frame">
                                    <div className="taxi-waiting-container">
                                        <div className="taxi-waiting-container-left">
                                            <div className="taxi-waiting-text">대기차량</div>
                                            <div className="taxi-waiting-image">
                                                <div
                                                    className="taxi-car-taxi-1-transportation-travel-taxi-transport-cab-car"
                                                >
                                                    <img
                                                        className="taxi-car-taxi-1-transportation-travel-taxi-transport-cab-car2"
                                                        src="/images/taxi.png"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="taxi-number">
                                            <div className="taxi-digit">8</div>
                                            <div className="taxi-span">대</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="taxi-service-container">
                                <div className="taxi-sevice-frame">
                                    <div className="taxi-service">
                                        <div className="taxi-service-text">서비스상태</div>
                                        <div className="taxi-service-condition">정상</div>
                                    </div>
                                    <div className="taxi-btn-container">
                                        <div className="taxi-btn-frame">
                                            <div className="taxi-btn-ex">택시호출</div>
                                            <div className={`taxi-slide-btn ${isOn ? 'taxi-slide-btn-on' : ''}`} onClick={handleToggle}>
                                                <div className={`taxi-slider ${isOn ? 'taxi-slider-on' : ''}`}></div>
                                            </div>
                                        </div>
                                        <div className="taxi-btn-frame">
                                            <div className="taxi-btn-ex">서비스 작동</div>
                                            <div className={`taxi-slide-btn ${isOn2 ? 'taxi-slide-btn-on' : ''}`} onClick={handleToggle2}>
                                                <div className={`taxi-slider ${isOn2 ? 'taxi-slider-on' : ''}`}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="taxi-bottom">
                        <div className="taxi-bottom-frame">
                            <div className="taxi-bottom-title">서비스 기록</div>
                            <div className="taxi-bottom-contents">
                                <div className="taxi-response">
                                    15:08 대기승객8명 대기차량8명 자동호출차량0대 서비스상태정상
                                </div>
                                <div className="taxi-response">
                                    15:09 대기승객8명 대기차량8명 자동호출차량0대 서비스상태정상
                                </div>
                                <div className="taxi-response">
                                    15:10 대기승객8명 대기차량8명 자동호출차량0대 서비스상태정상
                                </div>
                                <div className="taxi-response">
                                    15:11 대기승객9명 대기차량8명 자동호출차량1대 서비스상태정상
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )

}

export default Taxi