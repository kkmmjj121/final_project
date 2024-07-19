import React, { useState, useRef, useEffect } from 'react';
import '../styles/Lost.css';
import NavigationBar from "./NavigationBar";
import Calendar from 'react-calendar'; // react-calendar 라이브러리 import
import 'react-calendar/dist/Calendar.css'; // react-calendar 스타일
import axios from 'axios';
function Lost() {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const items=[];

    const [id, setId] = useState(1); // 초기값으로 1을 설정
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);




    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };
    const handleLastPage = () => {
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        setCurrentPage(totalPages);
    };
    const handleFirstPage = () => {
        setCurrentPage(1);
    };
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);

            // 단일 ID에 대해 데이터를 요청
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
                    return null; // ID가 존재하지 않을 경우 null 반환
                }
            };

            // 최대 ID를 결정하고 ID 범위에 대해 요청
            const maxId = 10; // DB에서 실제 최대 ID를 결정할 수 있으면 동적으로 변경

            const fetchedItems = [];
            for (let id = 1; id <= maxId; id++) {
                const item = await fetchItem(id);
                if (item) {
                    fetchedItems.push(item); // 유효한 아이템만 추가
                }
            }

            setFilteredItems(fetchedItems);
            setLoading(false);
        };

        fetchItems();
    }, []);




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


    return (
        <div className="lost">
            <NavigationBar />
            <div className="lost-content">
                <div className="lost-top">
                    <div className="lost-top-shadow">

                        <div className="lost-top-main">
                            <div className="lost-top-btn-content">
                                <div className="lost-top-btn-title"># 가장 많이 찾는 분실물 테그</div>
                                <div className="lost-top-btns">
                                    <div className="lost-top-btns-2">
                                        <div className="lost-btn">
                                            <div className="lost-btn-type">고양이</div>
                                        </div>
                                        <div className="lost-btn2">
                                            <div className="lost-btn-type2">멍멍이</div>
                                        </div>
                                        <div className="lost-btn2">
                                            <div className="lost-btn-type2">삐약이</div>
                                        </div>
                                        <div className="lost-btn2">
                                            <div className="lost-btn-type2">팽귄</div>
                                        </div>
                                        <div className="lost-btn2">
                                            <div className="lost-btn-type2">가방</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="line-31"></div>
                            <div className="lost-date-cate">
                                <div className="lost-date">
                                    <div className="lost-date-start">
                                        <div
                                            className="lost-date-start-placeholder"

                                        >
                                            {startDate ? startDate.toLocaleDateString() : '시작 날짜'}
                                        </div>
                                        <div className="calendar-frame" onClick={handleStartDateCalendarClick}>
                                            <img className="calendar2" src="/images/calendar.png" alt="calendar"/>
                                        </div>

                                    </div>
                                    {showStartDateCalendar && (
                                        <div className="calendar-popup" ref={calendarRef}>
                                            <Calendar onChange={handleStartDateChange} value={startDate}/>
                                        </div>
                                    )}
                                    <div className="lost-date-ing">~</div>
                                    <div className="lost-date-end">
                                        <div
                                            className="lost-date-end-placeholder"

                                        >
                                            {endDate ? endDate.toLocaleDateString() : '종료 날짜'}
                                        </div>
                                        <div className="calendar-frame" onClick={handleEndDateCalendarClick}>
                                            <img className="calendar2" src="/images/calendar.png" alt="calendar"/>
                                        </div>

                                    </div>
                                    {showEndDateCalendar && (
                                        <div className="calendar-popup" ref={calendarRef}>
                                            <Calendar onChange={handleEndDateChange} value={endDate}/>
                                        </div>
                                    )}
                                    <button className="calendar-refresh" onClick={handleResetDates}>
                                        <img src="/images/refresh.png"/>
                                    </button>
                                </div>
                                <div className="lost-cate">
                                    <input
                                        type="text"
                                        className="lost-cate-placeholder"
                                        placeholder="습득물"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button className="search-frame" onClick={handleSearch}>
                                        <img className="search" src="/images/search.png" alt="Search" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lost-title">분실물 찾기</div>
                </div>
                <div className="lost-police">
                    <div className="lost-police-container">
                        <div className="lost-police-ex">
                            <span>
                                <span className="lost-police-ex-span">
                                    ※분실물(유실물) 관할경찰서 이관시 경주경찰서 생활질서계 054)760-0379 또는 경찰청 유실물 통합포털사이트 로스트112에서 확인바랍니다.
                                    <br/>
                                </span>
                                <span className="lost-police-ex-span2">
                                    *분실물 보관기간 최대 6개월
                                </span>
                            </span>
                        </div>
                        <a href='https://www.lost112.go.kr/' className="lost-to-police-btn">
                            <div className="lost-to-police-btn-text">
                                경찰청 유실물 통합포털 바로가기
                            </div>
                        </a>
                    </div>
                </div>
                <div className="lost-main-frame">
                    <div className="lost-main-frame-cate">
                        <div className="lost-main-frame-category-container">
                            <div className="lost-main-frame-category">분류</div>
                            <div className="lost-main-frame-dot"></div>
                        </div>
                        <div className="lost-main-frame-name-container">
                            <div className="lost-main-frame-name">습득물</div>
                            <div className="lost-main-frame-dot"></div>
                        </div>
                        <div className="lost-main-frame-place-container">
                            <div className="lost-main-frame-place">습득장소</div>
                            <div className="lost-main-frame-dot"></div>
                        </div>
                        <div className="lost-main-frame-date-container">
                            <div className="lost-main-frame-date">습득일</div>
                            <div className="lost-main-frame-dot"></div>
                        </div>
                        <div className="lost-main-frame-result-container">
                            <div className="lost-main-frame-result">처리결과</div>
                        </div>
                    </div>
                    <div className="lost-main-frame-items">
                        {displayedItems.map((item, index) => (
                            <div key={index} className="frame-item">
                                <div className="frame-945">
                                    <div className="div">{item.category}</div>
                                </div>
                                <div className="frame-9452">
                                    <div className="div2">{item.lostName}</div>
                                </div>
                                <div className="frame-947">
                                    <div className="frame-950">
                                        <img className="marker-pin-01" src="/images/marker-pin-01.png" alt="marker pin"/>
                                        <div className="div3">{item.location}</div>
                                    </div>
                                </div>
                                <div className="frame-946">
                                    <div className="lost-item-date">{item.date}</div>
                                </div>
                                <div className="frame-945">
                                    <div className="frame-952">
                                        <div className="div4">{item.status}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lost-page">
                    <div className="lost-left-arrow">
                        <img className="chevron-left-double" src="/images/chevron-left-double.png" alt="previous double" onClick={handleFirstPage}/>
                        <img className="chevron-left" src="/images/chevron-left.png" alt="previous" onClick={handlePrevPage}/>
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
                        <img className="chevron-right" src="/images/chevron-right.png" alt="next" onClick={handleNextPage}/>
                        <img className="chevron-right-double" src="/images/chevron-right-double.png" alt="next double" onClick={handleLastPage}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lost;
