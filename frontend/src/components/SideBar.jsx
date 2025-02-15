import React, {useState} from "react"
import {
    Users,           // Following
    Compass,         // Explore
    Bookmark,        // Bookmarks
    Clock,           // History
    DotsThree
} from "phosphor-react";
import { FaBars } from "react-icons/fa";

const SideBar = () => {
    const [showSidebar, setShowSidebar]= useState(false);

    const [showDropdown, setShowDropdown] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen]= useState(false);

    return (
        <div className={`sidebox-container ${isSidebarOpen ? 'slide-left' : ''}`}>
            <div className="three-bars" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <FaBars size={25}></FaBars>
            </div>
            <div className="sidebar-box">
                <Users size={20}></Users>
                <span>Following</span>
            </div>
            <div className="sidebar-box">
                <Compass size={20}></Compass>
                <span>Explore</span>
            </div>
            <div className="sidebar-box">
                <Bookmark size={20}></Bookmark>
                <span>Bookmarks</span>
            </div>
            <div className="sidebar-box">
                <Clock size={20}></Clock>
                <span>History</span>
            </div>

            <section className="network">
                <h3>Network</h3>
                <div className="dots-container" onClick={() => setShowDropdown(!showDropdown)}>
                    <DotsThree size={20} className="dots"></DotsThree>
                </div>
                {showDropdown && (
                    <div className="dropdown-content">
                        <div className="sidebar-box">
                            <Clock size={20}></Clock>
                            <span>History</span>
                        </div>
                        <div className="sidebar-box">
                            <Clock size={20}></Clock>
                            <span>History</span>
                        </div>
                        <div className="sidebar-box">
                            <Clock size={20}></Clock>
                            <span>History</span>
                        </div>
                        <div className="sidebar-box">
                            <Clock size={20}></Clock>
                            <span>History</span>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default SideBar