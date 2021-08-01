import React from 'react';
import "./About.css";

function About() {
    return (
        <div className="about" id="about">
            <h5 className="about__title">About <span>Me</span></h5>
            <div className="about__box">
                <img src="https://res.cloudinary.com/dfeh7lczz/image/upload/v1626851587/juncheng_ae6i23.jpg" 
                alt="juncheng" className="about__image" />
                <div className="about__text">
                    <ul className="about__textGroupA">
                        <li className="about__textGroupAChild">Juncheng.</li>
                        <li className="about__textGroupAChild">A web-developer and business-developer.</li>
                        <li className="about__textGroupAChild">Business major with specialization in Banking and Finance.</li>
                    </ul>
                    <p className="about__textGroupB">Workout • Coding • Investing • Business</p>

                </div>
            </div>
        </div>
    )
}

export default About
