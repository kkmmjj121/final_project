import React, { useState, useRef, useEffect } from 'react';
import '../styles/Lost.css';
import NavigationBar from "./NavigationBar";
import Calendar from 'react-calendar'; // react-calendar 라이브러리 import
import 'react-calendar/dist/Calendar.css'; // react-calendar 스타일 import
function Lost() {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const items = [
        { category: '동물', name: '삼색 냥이', place: '옆집', date: '2024-07-15', status: '보관중' },
        { category: '동물', name: '강아지', place: '옆집', date: '2024-07-16', status: '반환완료' },
        { category: '기타', name: '오래된 분실물', place: '분실물센터앞', date: '2024-07-14', status: '경찰청 이관' },
        { category: '기타', name: '분실 스마트폰', place: '카페', date: '2024-07-17', status: '보관중' },
        { category: '가방', name: '검정색 백팩', place: '도서관', date: '2024-07-18', status: '보관중' },
        { category: '가방', name: '분실 레드 가방', place: '공원', date: '2024-07-19', status: '보관중' },
        { category: '가방', name: '회색 쇼퍼백', place: '마트', date: '2024-07-20', status: '보관중' },
        { category: '모자', name: '분실 화이트 캡', place: '체육관', date: '2024-07-21', status: '보관중' },
        { category: '모자', name: '블랙 헬멧', place: '서핑장', date: '2024-07-22', status: '보관중' },
        { category: '모자', name: '스트로포모자', place: '해변', date: '2024-07-23', status: '보관중' },
        { category: '서류', name: '주민등록증', place: '사무실', date: '2024-07-24', status: '보관중' },
        { category: '서류', name: '운전면허증', place: '차량', date: '2024-07-25', status: '보관중' },
        { category: '서류', name: '학생증', place: '학교', date: '2024-07-26', status: '보관중' },
        { category: '전자기기', name: '아이폰', place: '카페', date: '2024-07-27', status: '보관중' },
        { category: '전자기기', name: '갤럭시 태블릿', place: '도서관', date: '2024-07-28', status: '보관중' },
        // 추가 항목들...
    ];




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
                                    <div className="div2">{item.name}</div>
                                </div>
                                <div className="frame-947">
                                    <div className="frame-950">
                                        <img className="marker-pin-01" src="/images/marker-pin-01.png" alt="marker pin"/>
                                        <div className="div3">{item.place}</div>
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
