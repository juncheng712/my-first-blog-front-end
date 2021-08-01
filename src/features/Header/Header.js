import React from 'react';
import "./Header.css";
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import { HashLink } from "react-router-hash-link";


function Header() {
    return (
        <div className="header">
            <div className="header__choiceSection">
                <HashLink to={{ pathname: "/", hash: "#about" }} smooth className="header__choice">About</HashLink>
                
                <HashLink to={{ pathname: "/blogs" }} className="header__choice">Posts</HashLink>
            </div>

            <div className="header__logo">
                <AllInclusiveIcon />
            </div>

            <div className="header__choiceSection">
                <HashLink to={{ pathname: "/gallery" }} className="header__choice">Gallery</HashLink>
                <HashLink to={{ pathname: "/contact" }} className="header__choice">Contact</HashLink>
            </div>
        </div>
    )
}

export default Header
