import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/Management.css';
import NavigationBar from "./NavigationBar";
import Calendar from 'react-calendar'; // react-calendar 라이브러리 import
import 'react-calendar/dist/Calendar.css'; // react-calendar 스타일 import
import axios from 'axios';

function Management(){
    const [showPopup, setShowPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const imageUrlRef = useRef(null);

    const [openSessions, setOpenSessions] = useState({});
    const handleSessionToggle = (id) => {
        setOpenSessions(prevState => {
            const newState = { ...prevState, [id]: !prevState[id] };
            // 세션이 열릴 때 스크롤 비활성화
            if (Object.values(newState).includes(true)) {
                document.body.classList.add('modal-open');
            } else {
                document.body.classList.remove('modal-open');
            }
            return newState;
        });
    };
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    const handlePopupOpen = async (item) => {
        setSelectedItem(item);
        setEditItem({
            lostName: item.lostName,
            date: item.date,
            location: item.location,
            description: item.description,
            category: item.category
        });
        if (item && item.imgFilename) {
            // 이전 이미지 URL 해제
            if (imageUrlRef.current) {
                URL.revokeObjectURL(imageUrlRef.current);
            }
            // 새로운 이미지 URL 생성
            const url = await fetchImageUrl(item.imgFilename);
            setImageUrl(url);
            imageUrlRef.current = url;
        }
        setShowPopup(true);
        document.body.classList.add('modal-open');
    };

    const handlePopupClose = () => {
        // 이전 이미지 URL 해제
        if (imageUrlRef.current) {
            URL.revokeObjectURL(imageUrlRef.current);
            imageUrlRef.current = null;
        }
        setImageUrl(null); // 상태 초기화
        setShowPopup(false); // 팝업 닫기
        document.body.classList.remove('modal-open');
    };

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const items = [

        ];
    const [loading, setLoading] = useState(false);

    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);
    const fetchItemsBatch = useCallback(async (ids) => {
        try {
            const requests = ids.map(id => axios.get(`/lost-items/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }));
            const responses = await Promise.all(requests);
            return responses.map(response => response.data).filter(data => data && data.lostID);
        } catch (err) {
            console.error('Error fetching items batch:', err);
            throw err;
        }
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);

            const maxId = 100;
            const batchSize = 20; // 한 번에 요청할 ID 수
            const ids = Array.from({ length: maxId }, (_, i) => i + 1);

            try {
                const results = [];
                for (let i = 0; i < ids.length; i += batchSize) {
                    const batchIds = ids.slice(i, i + batchSize);
                    const batchItems = await fetchItemsBatch(batchIds);
                    results.push(...batchItems);
                }
                setFilteredItems(results);
            } catch (error) {
                setError('An error occurred while fetching items.');
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [fetchItemsBatch]);



    // 이미지 URL을 가져오는 함수
    const fetchImageUrl = async (filename) => {
        try {
            const timestamp = new Date().getTime(); // 현재 타임스탬프 추가
            const response = await axios.get(`/lost-items/display/${filename}?${timestamp}`, {
                responseType: 'blob', // 이미지 데이터를 Blob으로 받음
            });
            const url = URL.createObjectURL(response.data);
            return url;
        } catch (error) {
            console.error('Error fetching image:', error);
            return null;
        }
    };

    // selectedItem이 변경될 때마다 이미지 URL을 새로 불러옴
    useEffect(() => {
        const loadImage = async () => {
            if (selectedItem && selectedItem.imgFilename) {
                const url = await fetchImageUrl(selectedItem.imgFilename);
                setImageUrl(url);
            }
        };

        loadImage();
    }, [selectedItem]);
    const clearCheckedItems = () => {
        setCheckedItems([]); // 체크된 아이템 초기화
    };


    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        clearCheckedItems();
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
        clearCheckedItems();
    };
    const handleLastPage = () => {
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        clearCheckedItems();
        setCurrentPage(totalPages);
    };
    const handleFirstPage = () => {
        setCurrentPage(1);
        clearCheckedItems();
    };


    const getPageNumbers = () => {
        const totalItems = filteredItems.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const maxVisiblePages = 5;
        const pageNumbers = [];

        for (let i = 1; i <= Math.min(totalPages, maxVisiblePages); i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        clearCheckedItems();
    };


    const handleCheckboxChangeAll = (event) => {
        if (event.target.checked) {
            // 전체 선택
            setCheckedItems(displayedItems.map((item, index) => index)); // 인덱스 배열로 설정
        } else {
            // 전체 해제
            setCheckedItems([]);
        }
    };

    const [startDate, setStartDate] = useState(null); // 시작 날짜 상태
    const [endDate, setEndDate] = useState(null); // 종료 날짜 상태
    const [showStartDateCalendar, setShowStartDateCalendar] = useState(false); // 시작 날짜 달력 표시 여부 상태
    const [showEndDateCalendar, setShowEndDateCalendar] = useState(false); // 종료 날짜 달력 표시 여부 상태

    const calendarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowStartDateCalendar(false);
                setShowEndDateCalendar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleStartDateChange = (date) => {
        setStartDate(date); // 시작 날짜 업데이트
        setShowStartDateCalendar(false); // 시작 날짜 달력 숨기기
    };

    const handleEndDateChange = (date) => {
        setEndDate(date); // 종료 날짜 업데이트
        setShowEndDateCalendar(false); // 종료 날짜 달력 숨기기
    };

    const handleEndDateCalendarClick = () => {
        setShowEndDateCalendar(!showEndDateCalendar);
        setShowStartDateCalendar(false);
    };

    const handleStartDateCalendarClick = () => {
        setShowStartDateCalendar(!showStartDateCalendar);
        setShowEndDateCalendar(false);
    };
    const [filteredItems, setFilteredItems] = useState(items);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = () => {
        let filtered = items;

        // 아이템 이름 필터링
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // 날짜 필터링
        if (startDate && endDate) {
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= startDate && itemDate <= endDate;
            });
        }
        if (searchTerm.trim() === '' && (!startDate || !endDate)) {
            filtered = items;
        }

        // 상태 업데이트
        setFilteredItems(filtered);
        setCurrentPage(1); // 검색 시 페이지를 첫 페이지로 설정
    };


    // 현재 페이지에 따라 보여질 아이템을 계산합니다.
    const displayedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const handleResetDates = () => {
        setStartDate(null);
        setEndDate(null);
    };


    const handleCheckboxChange = (index) => {
        // 체크된 아이템의 인덱스가 이미 checkedItems 배열에 있으면 제거하고, 없으면 추가합니다.
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter(itemIndex => itemIndex !== index));
        } else {
            setCheckedItems([...checkedItems, index]);
        }
    };

    const [checkedItems, setCheckedItems] = useState([]);

    const [editItem, setEditItem] = useState({});

    const handleEditChange = (field, value) => {
        setEditItem(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleEditSubmit = async (e, itemId) => {
        e.preventDefault();

        const dateTime = new Date(editItem.date);
        let formattedDate = dateTime.toISOString().slice(0, 19);
        const finalDate = formattedDate;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('lostItem', JSON.stringify({
            ...editItem,
            date: finalDate
        }));

        try {
            await axios.put(`/lost-items/${itemId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            // 서버에서 업데이트 성공 후, 상태 갱신
            setFilteredItems(prevState =>
                prevState.map(item =>
                    item.lostID === itemId ? { ...item, ...editItem } : item
                )
            );

            // 페이지 새로고침
            window.location.reload();

            handleSessionToggle(itemId); // 세션 닫기
        } catch (error) {
            console.error('Error updating item:', error.response ? error.response.data : error.message);
        }
    };
    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`/lost-items/${itemId}`, {
                headers: { 'Content-Type': 'application/json' }
            });
            setFilteredItems(prevState => prevState.filter(item => item.lostID !== itemId));
            window.location.reload();
        } catch (error) {
            console.error('Error deleting item:', error.response ? error.response.data : error.message);
        }
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <div className="ad-div">
            <div className="ad-entire">
                <div className="ad-top">
                    <div
                        className="ad-top-container"
                        >
                        <div className="ad-top-shadow">
                            <div className="ad-top-click-part">
                                <div className="ad-top-fast-title">빠른검색</div>
                                <div className="ad-top-divide"></div>
                                <div className="ad-top-cal-name">
                                    <div className="ad-top-cal">
                                        <div className="ad-top-cal-frame">
                                            <div className="ad-top-placeholder">습득일</div>
                                            <div className="ad-top-cal-img">
                                                <img className="calendar" src="calendar0.svg"/>
                                            </div>
                                        </div>
                                        <div className="ad-top-ing">~</div>
                                        <div className="ad-top-cal-frame">
                                            <div className="ad-top-placeholder">습득일</div>
                                            <div className="ad-top-cal-img">
                                                <img className="calendar2" src="calendar1.svg"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ad-top-name-ref">
                                        <div className="ad-top-name-frame">
                                            <div className="ad-top-name-placeholder">습득물</div>
                                            <div className="ad-top-search-img">
                                                <div className="search">search</div>
                                            </div>
                                        </div>
                                        <img className="ad-top-refresh" src="ad-top-refresh0.svg"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ad-title">분실물 게시판 관리</div>
                    </div>
                </div>
                <div className="ad-main-search-container">
                    <div className="ad-main-search-title">
                        <div className="ad-div2">습득물 상세 검색</div>
                        <img className="chevron-down" src="chevron-down0.svg"/>
                    </div>
                    <div className="ad-main-search-frame">
                        <div className="ad-main-cate">
                            <div className="ad-main-cate-placeholder">분류</div>
                            <div className="ad-main-cate-btn">
                                <img className="pencil-01" src="pencil-010.svg"/>
                            </div>
                        </div>
                        <div className="ad-main-name">
                            <div className="ad-main-name-placeholder">습득물</div>
                            <div className="ad-main-name-btn">
                                <img className="pencil-012" src="pencil-011.svg"/>
                            </div>
                        </div>
                        <div className="ad-main-cal-container">
                            <div className="ad-main-cal-frame">
                                <div className="ad-main-cal-placeholder">습득일</div>
                                <div className="ad-main-cal-img">
                                    <img className="calendar3" src="calendar2.svg"/>
                                </div>
                            </div>
                            <div className="ad-main-ing">~</div>
                            <div className="ad-main-cal-frame">
                                <div className="ad-main-cal-placeholder">습득일</div>
                                <div className="ad-main-cal-img">
                                    <img className="calendar4" src="calendar3.svg"/>
                                </div>
                            </div>
                        </div>
                        <div className="ad-main-place-person">
                            <div className="ad-main-place-person-frame">
                                <div className="ad-main-place">
                                    <div className="ad-main-place-placeholder">습득장소</div>
                                    <div className="ad-main-place-btn">
                                        <img className="pencil-013" src="pencil-012.svg"/>
                                    </div>
                                </div>
                                <div className="ad-main-person">
                                    <div className="ad-main-person-placeholder">분실자 이름</div>
                                    <div className="ad-main-person-btn">
                                        <img className="pencil-014" src="pencil-013.svg"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ad-main-search-container2">
                        <div className="ad-main-search-btn">
                            <div className="ad-main-search-txt">검색하기</div>
                            <div className="ad-main-search-img">
                                <div className="ad-main-search-icon">search</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ad-main-item-cate">
                    <div className="ad-main-cate2">
                        <div className="ad-main-cate-checkbox-box">
                            <div className="ad-main-cate-dot"></div>
                            <input
                                type="checkbox"
                                checked={checkedItems.length === displayedItems.length && displayedItems.length > 0} // 전체 체크 상태를 확인
                                onChange={handleCheckboxChangeAll}
                            />
                        </div>
                        <div className="ad-main-cate-index-box">
                            <div className="ad-main-cate-index">등록번호</div>
                            <div className="ad-main-cate-dot"></div>
                        </div>
                        <div className="ad-main-cate-cate-box">
                            <div className="ad-main-cate-cate">분류</div>
                            <div className="ad-main-cate-dot"></div>
                        </div>
                        <div className="ad-main-cate-name-box">
                            <div className="ad-main-cate-name">습득물 이름</div>
                            <div className="ad-main-cate-dot"></div>
                        </div>

                        <div className="ad-main-cate-place-box">
                            <div className="ad-main-cate-place">습득장소</div>
                            <div className="ad-main-cate-dot"></div>
                        </div>
                        <div className="ad-main-cate-date-box">
                            <div className="ad-main-cate-date">습득일</div>
                            <div className="ad-main-cate-dot"></div>
                        </div>

                        <div className="ad-main-cate-admin-box">
                            <div className="ad-main-cate-admin">게시글 관리</div>
                        </div>
                    </div>
                    <div className="ad-item-container">
                        <div className="lost-main-frame-items">
                            {displayedItems.map((item, index) => (
                                <div key={index} className="frame-item">

                                        <div className="ad-main-cate-checkbox-box">

                                            <input
                                                type="checkbox"
                                                checked={checkedItems.includes(index)} // 해당 아이템의 인덱스가 checkedItems 배열에 있으면 체크됨
                                                onChange={() => handleCheckboxChange(index)} // 체크박스가 변경될 때 handleCheckboxChange 함수 호출
                                            />


                                        </div>

                                    <button
                                        className="ad-main-cate-index-box"
                                        onClick={() => handlePopupOpen(item)}
                                    >
                                        <div className="div2">{item.lostID}</div>
                                    </button>
                                    <div className="ad-main-cate-cate-box">
                                        <div className="frame-950">

                                        <div className="div3">{item.category}</div>
                                        </div>
                                    </div>
                                    <div className="ad-main-cate-name-box">
                                        <div className="div2">{item.lostName}</div>
                                    </div>

                                    <div className="ad-main-cate-place-box">
                                        <div className="frame-950">
                                            <img className="marker-pin-01" src="/images/marker-pin-01.png"
                                                 alt="marker pin"/>
                                            <div className="div3">{item.location}</div>
                                        </div>
                                    </div>
                                    <div className="ad-main-cate-date-box">
                                    <div className="frame-950">
                                            <div className="div3">{item.date}</div>
                                        </div>
                                    </div>

                                    <div className="ad-main-cate-admin-box">

                                        <button
                                            className="frame-983"
                                            onClick={() => handleSessionToggle(item.lostID)}
                                        >
                                            <div className="frame-981">
                                                <div className="smbtn">수정</div>
                                            </div>
                                        </button>
                                        {/* 세션 내용 */}
                                        {openSessions[item.lostID] && (
                                            <div className="session-overlay">
                                                <div className="session-content">
                                                    <form onSubmit={(e) => handleEditSubmit(e, item.lostID)}>
                                                        <label>
                                                            분류:
                                                            <input
                                                                type="text"
                                                                value={editItem.category || ''}
                                                                onChange={(e) => handleEditChange('category', e.target.value)}
                                                            />
                                                        </label>
                                                        <label>
                                                            이름:
                                                            <input
                                                                type="text"
                                                                value={editItem.lostName || ''}
                                                                onChange={(e) => handleEditChange('lostName', e.target.value)}
                                                            />
                                                        </label>
                                                        <label>
                                                            장소:
                                                            <input
                                                                type="text"
                                                                value={editItem.location || ''}
                                                                onChange={(e) => handleEditChange('location', e.target.value)}
                                                            />
                                                        </label>
                                                        <label>
                                                            날짜 및 시간:
                                                            <input
                                                                type="datetime-local"
                                                                value={editItem.date ? new Date(editItem.date).toISOString().slice(0, 16) : ''}
                                                                onChange={(e) => handleEditChange('date', e.target.value)}
                                                            />
                                                        </label>


                                                        <label>
                                                            설명:
                                                            <textarea
                                                                value={editItem.description || ''}
                                                                onChange={(e) => handleEditChange('description', e.target.value)}
                                                            />
                                                        </label>
                                                        <label>
                                                            이미지:
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleFileChange}
                                                            />
                                                        </label>
                                                        <button type="submit">저장</button>
                                                    </form>
                                                    <button onClick={() => handleDeleteItem(item.lostID)}>삭제</button>

                                                    <button className="session-close-button"
                                                            onClick={() => handleSessionToggle(item.lostID)}>닫기
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                    </div>

                                </div>
                            ))}
                        </div>
                        <div className="ad-item-delete-line">
                        <div className="ad-item-delete-box">
                                <div className="check-square"></div>
                                <div className="ad-item-delete-btn">
                                    <div className="ad-delete-txt">삭제</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ad-regi-line">
                        <a href='/Register' className="ad-regi-container">
                            <div className="ad-regi-btn">
                                <div className="ad-regi-txt">분실물 등록</div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="lost-page">
                    <div className="lost-left-arrow">
                        <img className="chevron-left-double" src="/images/chevron-left-double.png" alt="previous double"
                             onClick={handleFirstPage}/>
                        <img className="chevron-left" src="/images/chevron-left.png" alt="previous"
                             onClick={handlePrevPage}/>
                    </div>
                    {getPageNumbers().map((pageNumber, index) => (
                        typeof pageNumber === 'number' ? (
                            <button key={index}
                                    className={`page-button ${currentPage === pageNumber ? 'active-page' : ''}`}
                                    onClick={() => handlePageClick(pageNumber)}>
                                {pageNumber}
                            </button>
                        ) : (
                            <span key={index} className="ellipsis">...</span>
                        )
                    ))}
                    <div className="lost-right-arrow">
                    <img className="chevron-right" src="/images/chevron-right.png" alt="next"
                             onClick={handleNextPage}/>
                        <img className="chevron-right-double" src="/images/chevron-right-double.png" alt="next double"
                             onClick={handleLastPage}/>
                    </div>
                </div>
            </div>
            {showPopup && selectedItem && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="popup-close" onClick={handlePopupClose}>
                            X
                        </button>
                        <h2>상세 정보</h2>
                        <p><strong>등록번호:</strong> {selectedItem.lostID}</p>
                        <p><strong>분류:</strong> {selectedItem.category}</p>
                        <p><strong>이름:</strong> {selectedItem.lostName}</p>
                        <p><strong>장소:</strong> {selectedItem.location}</p>
                        <p><strong>날짜:</strong> {selectedItem.date}</p>
                        <p><strong>세부사항</strong></p>
                        <pre>
                            {selectedItem.description}
                        </pre>
                        <p><strong>이미지:</strong></p>
                        <p>Image Name: {selectedItem.imgFilename}</p>
                        {imageUrl ? (
                            <img src={imageUrl} alt={selectedItem.imgFilename} className="popup-image"/>
                        ) : (
                            <p>이미지를 불러오는 중입니다...</p>
                        )}
                    </div>
                </div>
            )}
        </div>


    );
}

export default Management;