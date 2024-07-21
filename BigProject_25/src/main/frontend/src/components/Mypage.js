import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Mypage.css';

// 모달 컴포넌트 정의
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

function Mypage() {
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 비밀번호 변경 폼 상태
    const [userID, setUserID] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    // 모달 표시 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const emailResponse = await axios.get('/auth/token/email');
                const nameResponse = await axios.get('/auth/token/name');
                setEmail(emailResponse.data);
                setName(nameResponse.data);
                setLoading(false);
            } catch (error) {
                setError('정보를 가져오는 중 에러가 발생했습니다.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePasswordChange = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/auth/change-password', new URLSearchParams({
                userID,
                oldPassword,
                newPassword
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            setPasswordSuccess(response.data);
            setPasswordError(null);
            setIsModalOpen(false);
        } catch (error) {
            console.log(error.response); // 오류 메시지 확인
            if (error.response) {
                setPasswordError(error.response.data);
            } else {
                setPasswordError('비밀번호 변경 중 오류가 발생했습니다.');
            }
            setPasswordSuccess(null);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return <p>이메일을 불러오는 중...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>마이페이지</h1>
            {email && name ? (
                <>
                    <p>이메일: {email}</p>
                    <p>이름: {name}</p>
                </>
            ) : (
                <p>정보를 가져오지 못했습니다.</p>
            )}

            <button onClick={handleOpenModal}>
                비밀번호 변경
            </button>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2>비밀번호 변경</h2>
                <form onSubmit={handlePasswordChange}>
                    <div>
                        <label htmlFor="userID">아이디:</label>
                        <input
                            type="text"
                            id="userID"
                            value={userID}
                            onChange={(e) => setUserID(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="oldPassword">기존 비밀번호:</label>
                        <input
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword">새 비밀번호:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">비밀번호 변경</button>
                </form>

                {passwordSuccess && <p>{passwordSuccess}</p>}
                {passwordError && <p>{passwordError}</p>}
            </Modal>
        </div>
    );
}

export default Mypage;
