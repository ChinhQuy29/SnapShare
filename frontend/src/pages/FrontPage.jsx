import React from "react";
import backgroundImage from "../assets/background.jpg"
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
    const navigate= useNavigate();

    return (
        <div className="front-page">
            <div className="front-nav-bar">
                <p className="arcane">Arcane</p>
                <div className="front-nav-bar-left">
                    <p>SERVICES</p>
                    <p>ABOUT</p>
                    <p className="login" onClick={() => navigate('/login')}>Login</p>
                </div>
            </div>
            <div className="front-page-content">
                <p className="welcome">Welcome to ARCANE!</p>
                <p className="start">START SHARING IMAGES WITH YOUR FRIENDS</p>
                <p className="explore">Explore</p>
            </div>
        </div>
    )
}

export default FrontPage