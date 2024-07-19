import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';
import {useNavigate} from "react-router-dom";

function Register() {
    const [category, setCategory] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        itemCategory: '',
        itemName: '',
        itemFeature: '',
        finderName: '',
        foundLocation: '',
        postContent: ''
    });
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        // 현재 날짜와 시간을 'YYYY-MM-DDTHH:mm:ss' 형식으로 설정하는 함수
        const getCurrentDateTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        };

        // 현재 날짜와 시간 설정
        setCurrentDateTime(getCurrentDateTime());
    }, []);
    const navigate = useNavigate();
    const handleCategorySelect = (category) => {
        setCategory(category);
        setFormData((prevFormData) => ({
            ...prevFormData,
            itemCategory: category
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('lostItem', JSON.stringify({
            lostName: formData.itemName,
            date: currentDateTime, // 현재 날짜와 시간 포함
            location: formData.foundLocation,
            description: formData.postContent,
            category: formData.itemCategory
        }));

        try {
            const response = await axios.post('lost-items', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/Management');
            console.log('Success:', response.data);
            alert('게시글이 등록되었습니다!');
        } catch (error) {
            console.error('Error:', error);
            alert('게시글 등록에 실패했습니다.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <label>분류</label>
                    <div>
                        <button type="button" onClick={() => handleCategorySelect('아이폰')}>아이폰</button>
                        <button type="button" onClick={() => handleCategorySelect('가방')}>가방</button>
                        <button type="button" onClick={() => handleCategorySelect('지갑')}>지갑</button>
                    </div>

                    <label htmlFor="itemCategory">분류</label>
                    <input type="text" id="itemCategory" value={formData.itemCategory} onChange={handleInputChange} />
                    <label htmlFor="itemName">습득물 이름</label>
                    <input type="text" id="itemName" value={formData.itemName} onChange={handleInputChange} />
                    <label htmlFor="itemFeature">습득물 특징</label>
                    <input type="text" id="itemFeature" value={formData.itemFeature} onChange={handleInputChange} />
                    <label htmlFor="finderName">본인자 이름</label>
                    <input type="text" id="finderName" value={formData.finderName} onChange={handleInputChange} />
                    <label htmlFor="foundLocation">습득 장소</label>
                    <input type="text" id="foundLocation" value={formData.foundLocation} onChange={handleInputChange} />
                    <label htmlFor="postContent">게시글 내용 (상세한 설명)</label>
                    <textarea id="postContent" rows="4" value={formData.postContent} onChange={handleInputChange}></textarea>
                </div>

                <div className="upload-section">
                    <label htmlFor="file-upload" id="file-label">파일업로드</label>
                    <input type="file" id="file-upload" onChange={handleFileChange} />
                    {imageSrc ? <img src={imageSrc} alt="Preview" id="image-preview" /> : <p id="file-name">AI가 습득물의 종류를 자동으로 입력 해 드립니다.</p>}
                </div>

                <div className="datetime-section">
                    <label htmlFor="currentDateTime">현재 날짜 및 시간</label>
                    <input
                        type="text"
                        id="currentDateTime"
                        value={currentDateTime}
                        readOnly
                    />
                </div>

                <button className="submit-btn" type="submit">게시글 등록</button>
            </form>
        </div>
    );
}

export default Register;
