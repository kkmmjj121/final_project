import React, { useState, useRef, useEffect } from 'react';
import '../styles/Management.css';
import NavigationBar from "./NavigationBar";
import Calendar from 'react-calendar'; // react-calendar 라이브러리 import
import 'react-calendar/dist/Calendar.css'; // react-calendar 스타일 import

function Management(){
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const items = [
            {"category": "동물", "name": "et", "person": "준영", "place": "수원시 팔달구", "date": "2024-05-25", "status": "반환완료"},
            {"category": "식물", "name": "quibusdam", "person": "상현", "place": "서천군", "date": "2024-04-09", "status": "경찰서 이관"},
            {"category": "기타", "name": "quam", "person": "명자", "place": "성남시", "date": "2024-01-26", "status": "경찰서 이관"},
            {"category": "식물", "name": "voluptatem", "person": "은지", "place": "원주시", "date": "2024-01-23", "status": "보관중"},
            {"category": "동물", "name": "similique", "person": "병철", "place": "부여군", "date": "2024-02-29", "status": "경찰서 이관"},
            {"category": "물건", "name": "velit", "person": "서연", "place": "안산시", "date": "2024-06-30", "status": "반환완료"},
            {"category": "동물", "name": "perspiciatis", "person": "미숙", "place": "남양주시", "date": "2024-02-22", "status": "반환완료"},
            {"category": "동물", "name": "deleniti", "person": "영식", "place": "의왕시", "date": "2024-02-18", "status": "경찰서 이관"},
            {"category": "물건", "name": "qui", "person": "예원", "place": "부천시", "date": "2024-03-12", "status": "반환완료"},
            {"category": "기타", "name": "eveniet", "person": "정희", "place": "동해시", "date": "2024-04-01", "status": "경찰서 이관"},
            {"category": "식물", "name": "ad", "person": "민서", "place": "오산시", "date": "2024-03-17", "status": "경찰서 이관"},
            {"category": "기타", "name": "officia", "person": "정훈", "place": "고양시 일산동구", "date": "2024-07-10", "status": "보관중"},
            {"category": "식물", "name": "deserunt", "person": "예원", "place": "고성군", "date": "2024-05-28", "status": "경찰서 이관"},
            {"category": "기타", "name": "reiciendis", "person": "수빈", "place": "청주시 상당구", "date": "2024-01-25", "status": "보관중"},
            {"category": "물건", "name": "dignissimos", "person": "정훈", "place": "정읍시", "date": "2024-07-08", "status": "보관중"},
            {"category": "동물", "name": "odio", "person": "영수", "place": "용인시 처인구", "date": "2024-04-06", "status": "보관중"},
            {"category": "동물", "name": "eum", "person": "예은", "place": "단양군", "date": "2024-03-27", "status": "보관중"},
            {"category": "식물", "name": "ipsa", "person": "지은", "place": "성남시", "date": "2024-04-22", "status": "경찰서 이관"},
            {"category": "동물", "name": "aliquam", "person": "영미", "place": "단양군", "date": "2024-04-20", "status": "반환완료"},
            {"category": "식물", "name": "nam", "person": "민재", "place": "안성시", "date": "2024-05-14", "status": "반환완료"},
            {"category": "동물", "name": "incidunt", "person": "주원", "place": "태백시", "date": "2024-04-24", "status": "경찰서 이관"},
            {"category": "동물", "name": "a", "person": "도현", "place": "포천시", "date": "2024-02-15", "status": "보관중"},
            {"category": "식물", "name": "consequatur", "person": "준서", "place": "의정부시", "date": "2024-03-27", "status": "반환완료"},
            {"category": "물건", "name": "omnis", "person": "시우", "place": "부천시 원미구", "date": "2024-02-26", "status": "반환완료"},
            {"category": "기타", "name": "dolores", "person": "서윤", "place": "부여군", "date": "2024-07-08", "status": "반환완료"},
            {"category": "동물", "name": "veniam", "person": "경수", "place": "이천시", "date": "2024-05-26", "status": "보관중"},
            {"category": "물건", "name": "maiores", "person": "건우", "place": "서천군", "date": "2024-05-04", "status": "반환완료"},
            {"category": "물건", "name": "quam", "person": "성수", "place": "양주시", "date": "2024-04-21", "status": "반환완료"},
            {"category": "식물", "name": "neque", "person": "성수", "place": "수원시 장안구", "date": "2024-05-08", "status": "반환완료"},
            {"category": "기타", "name": "voluptatem", "person": "유리", "place": "성남시", "date": "2024-01-18", "status": "보관중"},
            {"category": "물건", "name": "veritatis", "person": "예림", "place": "고양시 덕양구", "date": "2024-03-14", "status": "보관중"},
            {"category": "동물", "name": "facere", "person": "지훈", "place": "전주시 완산구", "date": "2024-04-07", "status": "보관중"},
            {"category": "물건", "name": "voluptatem", "person": "은지", "place": "남양주시", "date": "2024-06-13", "status": "반환완료"},
            {"category": "기타", "name": "nemo", "person": "승우", "place": "평택시", "date": "2024-05-23", "status": "경찰서 이관"},
            {"category": "식물", "name": "eum", "person": "지은", "place": "광주시", "date": "2024-04-12", "status": "반환완료"},
            {"category": "동물", "name": "id", "person": "석현", "place": "김해시", "date": "2024-06-20", "status": "보관중"}
        ]

    ;

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
    // const [checked, setChecked] = useState(false);

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
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (index) => {
        // 체크된 아이템의 인덱스가 이미 checkedItems 배열에 있으면 제거하고, 없으면 추가합니다.
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter(itemIndex => itemIndex !== index));
        } else {
            setCheckedItems([...checkedItems, index]);
        }
    };

    const [checkedItems, setCheckedItems] = useState([]);


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
                        <div className="ad-main-cate-person-box">
                            <div className="ad-main-cate-person">분실자 이름</div>
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
                        <div className="ad-main-cate-result-box">
                            <div className="ad-main-cate-result">처리결과</div>
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

                                    <div className="ad-main-cate-index-box">
                                        <div className="div2">{index}</div>
                                    </div>
                                    <div className="ad-main-cate-cate-box">
                                        <div className="frame-950">

                                            <div className="div3">{item.place}</div>
                                        </div>
                                    </div>
                                    <div className="ad-main-cate-name-box">
                                        <div className="div2">{item.name}</div>
                                    </div>
                                    <div className="ad-main-cate-person-box">
                                        <div className="frame-950">
                                            <div className="div3">{item.person}</div>
                                        </div>
                                    </div>
                                    <div className="ad-main-cate-place-box">
                                        <div className="frame-950">
                                            <img className="marker-pin-01" src="/images/marker-pin-01.png"
                                                 alt="marker pin"/>
                                            <div className="div3">{item.place}</div>
                                        </div>
                                    </div>
                                    <div className="ad-main-cate-date-box">
                                    <div className="frame-950">
                                            <div className="div3">{item.date}</div>
                                        </div>
                                    </div>
                                    <div className="ad-main-cate-result-box">
                                        <div className="frame-952">
                                            <div className="div4">{item.status}</div>
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
        </div>

    );
}

export default Management;