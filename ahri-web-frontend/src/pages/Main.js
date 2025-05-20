import React, {useRef, useState} from "react";
import Header from "../components/Header";
import Contact from "../components/Contact";
import ChatInput from "../components/ChatInput";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import {FullpageContainer, FullpageSection,} from '@shinyongjun/react-fullpage';
import '@shinyongjun/react-fullpage/css';


function Main() {
    // 아코디언 클릭 시 열거나 닫는 처리
    const [activeIndex, setActiveIndex] = useState(0); // 아코디언 상태
    const [accordionActiveIndex, setAccordionActiveIndex] = useState(null);

    // 아코디언 클릭 시 열거나 닫는 처리
    const handleAccordionClick = (index) => {
        setAccordionActiveIndex((prev) => (prev === index ? null : index));

    };

    const sliderRef = useRef(null);

    const sliderSettings = {
        centerMode: false,
        slidesToShow: 4,
        arrows: false,
        dots: true,
        infinite: true,
        swipeToSlide: true,  // << 이거 추가!!
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                },
            },
        ],
    };

    const settings = {
        centerMode: true,
        infinite: false,
        centerPadding: '0',
        slidesToShow: 4 ,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    centerMode: true,
                    centerPadding: '30px',
                    slidesToShow: 1,
                },
            },
        ],
    };

    const handlePrevClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const handleNextClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };
    
    return(

        <div id="outer">
            <div id="parallax-bg"   style={{
                backgroundImage: "url('/img/우주.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "120vh",
                zIndex: -1,
                transform: "translateY(0)",
                willChange: "transform",
                opacity: 0.9,

            }}></div>
            <div id="loadingSpinner">
                <img src="/img/loading.svg" alt="로딩 중..."/>
            </div>
            <main id="content-box" className="order-first">
                {/* 로고 영역 */}
{/*                <a href="http://localhost:3000">
                    <div className="navbar-logo" style={{ textAlign: "left" }}>
                        <img src="/img/logo.png" alt="Logo" style={{ width: "218px" }} />
                    </div>
                </a>*/}
                <Header setActiveIndex={setActiveIndex} activeIndex={activeIndex}></Header>
                <FullpageContainer
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}>
                    <FullpageSection>

                        <div className="banner-section section parallax-window" data-parallax="scroll"
                             data-image-src="img/background.png" id="section-1">
                            <div className="container">
                                <div className="hero-wrapper">
                                    <div className="hero-card">
                                        <div className="hero-icon">
                                            <i className="fas fa-atom fa-2x"></i>
                                        </div>
                                        <h1> Refine My Knowledge<br/>
                                             Master My Experience<br/>
                                            Compose My Data</h1>
                                        <p>내 지식을 정제하고, 내 경험을 숙달하며, 내 데이터를 지배하다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FullpageSection>
                    <FullpageSection>
                        <section className="work-section section parallax-window" id="section-2">
                            <div className="container">
                                <div className="title text-right">
                                    <h2>소개</h2>
                                </div>
                                <div className="gallery-slider-wrapper">
                                    <Slider {...settings}>
                                        <div>
                                            <div className="gallery-card">
                                                <h3>정보 관리 및 검색</h3>
                                                <p>빠른 정보 검색과 추론이 가능합니다.
                                                    저장된 문서를 기반으로 필요한 정보를 즉시 찾아 제공합니다.</p>
                                                <img src="img/sporeage.png" alt="Card1"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="gallery-card">
                                                <h3>지식 및 인사이트 제공</h3>
                                                <p>문서 내용 요약 및 분석하고, 중요한 내용을 추출하고 핵심을 파악합니다.</p>
                                                    <p>데이터 기반 결과 도출
                                                    문서 속 숨겨진 패턴과 트렌드를 분석해 유용한 정보를 제공합니다</p>
                                                <img src="img/sporeage.png" alt="Card2"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="gallery-card">
                                                <h3>업무 자동화 및 지원</h3>
                                                <p>스마트 알람 : 문서와 연계된 일정으로 알림 설정을 제공합니다.</p>
                                                <p>맞춤형 추천,  의사결정 지원  – 사용자의 다양한 업무에 맞춘 정보 추천 및 의사결정 도움.  </p>
                                                <img src="img/answer.png" alt="Card3"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="gallery-card">
                                                <h3>보안 및 개인화</h3>
                                                <p>데이터의 보호 - 문서를 AI스토리지에 안전하게 저장합니다.</p>
                                                <p>사용자 맞춤형 AI  – 개인화된 검색 방식과 추천 기능을 학습하여 좀 더 사용자가 원하는 더 가까운 응답을 제공합니다.</p>
                                                <img src="img/answer.png" alt="Card3"/>
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </section>
                    </FullpageSection>
                    <FullpageSection>
                        <section
                            className="gallery-section section parallax-window"
                            data-parallax="scroll"
                            data-image-src="img/background.jpg"
                            id="section-3">
                            <div className="container">
                                <div className="title text-right">
                                    <h2>보안정책</h2>
                                </div>

                                <div className="gallery-slider-wrapper">
                                    <Slider {...sliderSettings}>
                                        <div>
                                            <div className="gallery-card">
                                                <h3>데이터 암호화</h3>
                                                <p>저장 및 전송되는 모든 문서는 openai의 강력한 암호화 기술을 적용하여 보호됩니다.</p>
                                                <img src="img/gallery-img-01.jpg" alt="Card1"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="gallery-card">
                                                <h3>개인정보 보호 </h3>
                                                <p>사용자의 데이터는 외부와 공유되지 않으며, 철저한 접근 통제 시스템을 적용합니다.</p>
                                                <img src="img/gallery-img-02.jpg" alt="Card2"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="gallery-card">
                                                <h3>사용자 인증 및 권한 관리</h3>
                                                <p>AI 비서에 접근할 수 있는 사용자 권한을 명확히 설정하고 인증을 적용하여 보안을 강화합니다. </p>
                                                <img src="img/gallery-img-03.jpg" alt="Card3"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="gallery-card">
                                                <h3>AI 모델의 안전성 검토</h3>
                                                <p>OpenAI의 최신 보안 가이드라인을 준수하며 AI의 응답을 검토하는 시스템을 구축합니다. </p>
                                                <img src="img/gallery-img-04.jpg" alt="Card4"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="gallery-card">
                                                <h3>데이터 삭제 및 제어</h3>
                                                <p>사용자가 원할 경우 자신의 데이터를 완전히 삭제할 수 있으며, AI가 불필요한 정보를 저장하지 않도록 설계됩니다.  </p>
                                                <img src="img/gallery-img-05.jpg" alt="Card5"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="gallery-card">
                                                <h3>보안 인증 및 법규 준수</h3>
                                                <p>GDPR, ISO 27001 등의 국제 보안 규정을 준수하여 신뢰성을 확보합니다.</p>
                                                <img src="img/gallery-img-06.jpg" alt="Card6"/>
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </section>
                    </FullpageSection>

                    <FullpageSection>
                        <section className="gallery-section section  parallax-window" data-parallax="scroll"
                                 id="section-4">
                            <div className="faq-container">

                                <h2 className="faq_h2">Ahri 관련 자주 묻는 질문</h2>
                                <div className="faq_dec">업무 방식을 <br/> <strong>획기적으로</strong><br/> 바꿀 스마트한 도구</div>
                                <div className="accordion">
                                    <div className={`accordion-item ${accordionActiveIndex === 0 ? 'active' : ''}`}>
                                        <button
                                            className="accordion-header"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                e.nativeEvent.stopImmediatePropagation();
                                                handleAccordionClick(0);
                                            }}
                                        >
                                            Ahri AI 서비스는 무엇인가요?
                                        </button>
                                        <div className="accordion-body">
                                            <p>Ahri AI 서비스는 사내 문서 파일을 기반으로 사용자가 필요한 데이터를 정리 및 대답해줍니다.</p>
                                        </div>
                                    </div>

                                    <div className={`accordion-item ${accordionActiveIndex === 1 ? 'active' : ''}`}>
                                        <button
                                            className="accordion-header"
                                            onClick={() => handleAccordionClick(1)}
                                        >
                                            Ahri AI 서비스는 어떤 일을 할 수 있나요?
                                        </button>
                                        <div className="accordion-body">
                                            <p>아리 AI 서비스는 파일 기반 시스템의 관리로 사내 문서를 통합하여 관리해주고
                                                해당 문서를 기반으로 AI가 정리해 필요한 내용을 답변해줍니다. </p>
                                        </div>
                                    </div>

                                    <div className={`accordion-item ${accordionActiveIndex === 2 ? 'active' : ''}`}>
                                        <button
                                            className="accordion-header"
                                            onClick={() => handleAccordionClick(2)}
                                        >
                                             Ahri AI는 어떻게 응답 시간을 단축하고 문제 해결률을 개선하나요?
                                        </button>
                                        <div className="accordion-body">
                                            <p>Ahri AI는 담당자가 필요한 내용을 모아놓은 파일 시스템을 기반으로 찾아내어 담당자에게 원하는 답변을 해줍니다.
                                            필요하다면 웹에서의 검색이 가능하며, 파일의 내용을 웹에서 비교하는 서비스도 제공됩니다.</p>
                                        </div>
                                    </div>

                                    <div className={`accordion-item ${accordionActiveIndex === 3 ? 'active' : ''}`}>
                                        <button
                                            className="accordion-header"
                                            onClick={() => handleAccordionClick(3)}
                                        >
                                            Ahri AI는 회사 데이터를 어떻게 안전하게 보호하나요?
                                        </button>
                                        <div className="accordion-body">
                                            <p>Napkin supports team collaboration, allowing multiple users to work on
                                                the same
                                                project, share ideas, and create visuals together in real-time.</p>
                                        </div>
                                    </div>
                                    <div className={`accordion-item ${accordionActiveIndex === 4 ? 'active' : ''}`}>
                                        <button
                                            className="accordion-header"
                                            onClick={() => handleAccordionClick(4)}
                                        >
                                            Ahri AI를 사용 중인 회사는 어떤 지원이 제공되나요?
                                        </button>
                                        <div className="accordion-body">
                                            <p>Ahri AI 는 회사의 문서를 관리해주고 , 문서를 바탕으로 필요한 데이터를 뽑아내어 출력해줍니다. </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FullpageSection>
                    <FullpageSection>
                        <section className="gallery-section section parallax-window" data-parallax="scroll"
                                 data-image-src="img/section-3-bg.jpg" id="section-5">
                            <div className="container">
                                <div className="title text-center">
                                    <h2>사용자 리뷰 및 피드백</h2>
                                </div>

                                <div className="testimonial-slider-wrapper">
                                    <button className="arrow arrow-prev" onClick={handlePrevClick}
                                            aria-label="Previous">&#10094;</button>

                                    <div className="testimonial-slider">
                                        <Slider {...sliderSettings} ref={sliderRef}>
                                            <div className="testimonial-card">
                                                <div className="card-header">
                                                    <img src="img/gallery-img-01.jpg" alt="User 1" className="avatar"/>
                                                    <div>
                                                        <h4>Wade Warren</h4>
                                                        <span>★★★★★</span>
                                                    </div>
                                                </div>
                                                <p>"when an unknown printer took alley filter area type and
                                                    scrambled..."</p>
                                            </div>
                                            <div className="testimonial-card">
                                                <div className="card-header">
                                                    <img src="img/gallery-img-02.jpg" alt="User 2" className="avatar"/>
                                                    <div>
                                                        <h4>Jenny Wilson</h4>
                                                        <span>★★★★★</span>
                                                    </div>
                                                </div>
                                                <p>"when an unknown printer took alley filter area type and
                                                    scrambled..."</p>
                                            </div>
                                            <div className="testimonial-card">
                                                <div className="card-header">
                                                    <img src="img/gallery-img-03.jpg" alt="User 3" className="avatar"/>
                                                    <div>
                                                        <h4>Guy Hawkins</h4>
                                                        <span>★★★★★</span>
                                                    </div>
                                                </div>
                                                <p>"when an unknown printer took alley filter area type and
                                                    scrambled..."</p>
                                            </div>
                                            <div className="testimonial-card">
                                                <div className="card-header">
                                                    <img src="img/gallery-img-03.jpg" alt="User 4" className="avatar"/>
                                                    <div>
                                                        <h4>Hoy Hawkins</h4>
                                                        <span>★★★★★</span>
                                                    </div>
                                                </div>
                                                <p>"when an unknown printer took alley filter area type and
                                                    scrambled..."</p>
                                            </div>
                                        </Slider>
                                    </div>

                                    <button className="arrow arrow-next" onClick={handleNextClick}
                                            aria-label="Next">&#10095;</button>
                                </div>
                            </div>
                        </section>
                    </FullpageSection>
                    <FullpageSection>
                    <Contact></Contact>
                    </FullpageSection>
                </FullpageContainer>
                <ChatInput></ChatInput>

            </main>
        </div>
    )
}

export default Main