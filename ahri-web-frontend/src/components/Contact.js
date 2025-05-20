import React from 'react';

function Contact() {
    return (
        <section data-image-src="img/background.png" className="contact-section section parallax-window" id="section-6">
            <div className="container">

                <div className="title">
                    <h3>Contact Us</h3>
                </div>

                <div className="col-lg-4 col-md-6 mb-4 contact-details">
                    <div className="tm-contact-item-inner-2">
                        <p>Nam mollis felis elementum, placerat dolor id, vehicula libero. Etiam dui nisl,
                            mattis ut rhoncus et, cursus ut diam.</p>
                        <ul className="font-weight-light">
                            <li>
                                <span className="icn"><i className="fas fa-mobile-alt"></i></span>
                                <span className="lbl">Tel:</span> <a href="#">010-020-0340</a>
                            </li>
                            <li>
                                <span className="icn"><i className="fas fa-at"></i></span>
                                <span className="lbl">Email:</span> <a href="#">info@company.com</a>
                            </li>
                            <li>
                                <span className="icn"><i className="fas fa-globe-asia"></i></span>
                                <span className="lbl">URL:</span> <a href="#">www.company.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Contact;
