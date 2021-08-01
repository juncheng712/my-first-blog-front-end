import React from 'react';
import Hero from "../../features/Hero/Hero";
import About from "../../features/About/About";
import HomePost from "../../features/HomePost/HomePost";

function HomePage() {
    return (
        <div>
            <Hero />
            <About />
            <hr></hr>
            <HomePost />
        </div>
    )
}

export default HomePage
