import React, { useState, useRef, useEffect } from 'react';
import '../styles/Management.css';
import NavigationBar from "./NavigationBar";
import Calendar from 'react-calendar'; // react-calendar 라이브러리 import
import 'react-calendar/dist/Calendar.css'; // react-calendar 스타일 import
import axios from 'axios';

function Management(){
    const [showPopup, setShowPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [popupImageUrl, setPopupImageUrl] = useState(null); // 팝업 이미지 URL 상태 추가

    const handlePopupOpen = (item) => {
        setSelectedItem(item);
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setSelectedItem(null);
        setPopupImageUrl(null); // 팝업 이미지 URL 초기화
    };

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const items = [

        ];
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageName, setImageName] = useState('');
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);

            const fetchItem = async (id) => {
                try {
                    const response = await axios.get(`/lost-items/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    return response.data;
                } catch (err) {
                    console.log(`Error fetching ID ${id}: ${err.message}`);
                    return null;
                }
            };

            const maxId = 12; // 실제 최대 ID로 교체
            const fetchedItems = [];
            for (let id = 1; id <= maxId; id++) {
                const item = await fetchItem(id);
                if (item) {
                    fetchedItems.push(item);
                }
            }

            setFilteredItems(fetchedItems);
            setLoading(false);
        };

        fetchItems();
    }, []);

    // 이미지 URL을 가져오는 함수
    const fetchImageUrl = async (filename) => {
        try {
            const response = await axios.get(`/lost-items/display/${filename}`, {
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
                                        <div className="frame-982">
                                            <div className="frame-983">
                                                <div className="frame-980">
                                                    <div className="smbtn">삭제</div>
                                                </div>
                                                <div className="frame-981">
                                                    <div className="smbtn">수정</div>
                                                </div>
                                            </div>
                                        </div>
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
                        <div className="ad-regi-container">
                            <div className="ad-regi-btn">
                                <div className="ad-regi-txt">분실물 등록</div>
                            </div>
                        </div>
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
                        <p><strong>이미지:</strong></p>
                        <p>Image Name: {selectedItem.imgFilename}</p>
                        {imageUrl ? (
                            <img src={imageUrl} alt={selectedItem.imgFilename}/>
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