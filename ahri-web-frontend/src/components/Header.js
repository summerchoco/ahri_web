import React from 'react';
import '../styles/Main.css'
function Header({ setActiveIndex ,activeIndex }) {
    const navItems = [
        { label: "", icon: "fas fa-2x fa-solid fa-house", index: 0 },
        { label: "", icon: "fab fa-2x fa-battle-net", index: 1 },
        { label: "", icon: "fas fa-2x fa-lock", index: 2 },
        { label: "", icon: "fas fa-2x fa-question-circle", index: 3 },
        { label: "", icon: "fas fa-2x fa-star", index: 4 },
        { label: "", icon: "far fa-2x fa-comments", index: 5 },
    ];
    return (
        <header className="header order-last" id="tm-header">
            <nav className="navbar">
                <div className="collapse navbar-collapse">


                    <ul className="navbar-nav">
                        {navItems.map((item, i) => (

                            <li key={i} className={`nav-item ${item.index === activeIndex ? 'active' : ''}`}>
                                <div
                                    className="nav-link"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setActiveIndex(item.index)}>
                  <span className="icn">
                    <i className={item.icon}></i>
                  </span>
                                    {item.label}
                                </div>
                            </li>
                        ))}
                        <li>
                            <div className="nav_footer">
                                <p>Copyright 2025 BNSoft</p>
                                <p>
                                    Design:{" "}
                                    <a rel="nofollow" href="https://gw.bns.co.kr" target="_blank">
                                        BNSoft
                                    </a>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
