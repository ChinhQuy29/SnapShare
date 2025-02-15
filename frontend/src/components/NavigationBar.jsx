import { useState } from "react";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { Users } from "lucide-react";
import { User } from "lucide-react";
import { Bell } from "phosphor-react";
import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm.jsx";


const NavigationBar = () => {
    const navigate= useNavigate();
    const [showForm, setShowForm]= useState(false);

    const [showUserDropdown, setShowUserDropdown]= useState(false);

    return (
        <nav className="navigation-bar">
            <div className="navigation-left" onClick={() => navigate('/home')}>
                ARCANE
            </div>
            <div className="navigation-middle" onClick={() => document.querySelector('.nav-search-bar').focus()}>
                <BsSearch size={20}></BsSearch>
                <input type="text" placeholder="Search" className="nav-search-bar" />
            </div>
            <div className="navigation-right">
                <div 
                    className="new-post"
                    onClick={() => setShowForm(true)}    
                >New Post</div>
                <div className="friends right-box">
                    <Users size={20}></Users>
                </div>
                <div className="notification right-box">
                    <Bell size={20}></Bell>
                </div>
                <div className="user right-box" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                    <User size={20}></User>
                </div>
                { showUserDropdown && (
                    <div className="user-dropdown">
                        <div className="user-dropdown-profile user-dropdown-box" onClick={() => navigate('/profile')}>
                            <AiOutlineUser size={20}></AiOutlineUser>
                            <p>Profile</p>
                        </div>
                        <div className="user-dropdown-detail user-dropdown-box">
                            <AiOutlineEdit size={20}></AiOutlineEdit>
                            <p>Account Details</p>
                        </div>
                        <div className="user-dropdown-setting user-dropdown-box">
                            <AiOutlineSetting size={20}></AiOutlineSetting>
                            <p>Settings</p>
                        </div>
                        <div className="user-dropdown-logout user-dropdown-box" onClick={() => navigate('/')}>
                            <AiOutlineLogout size={20}></AiOutlineLogout>
                            <p>Logout</p>
                        </div>
                    </div>
                ) }
            </div>

            { showForm && (
                <PostForm onClose={() => setShowForm(false)}></PostForm>
            ) }
        </nav>
    )
}

export default NavigationBar