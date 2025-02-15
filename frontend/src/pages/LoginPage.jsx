import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [isUsernameClicked, setIsUsernameClicked] = useState(false);
    const [isPasswordClicked, setIsPasswordClicked] = useState(false);
    const [isShowClicked, setIsShowClicked]= useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate= useNavigate()

    const handleLogin= async () => {
        try {
            const response= await axios.post('http://localhost:5000/users/login', { username, password });
            if (response.status !== 200) {
                alert(response.data.message);
            } else {
                const { accessToken, refreshToken }= response.data;
                alert('Login successfully');
                localStorage.setItem("accessToken", accessToken);
                navigate('/home')
                if (refreshToken) {
                    localStorage.setItem("refreshToken", refreshToken);    
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login-form-container">
            <div className="login-form">
                <h2>Login</h2>
                <div className="username-container" onClick={() => setIsUsernameClicked(!isUsernameClicked)}>
                    <div style={{
                        fontSize: isUsernameClicked ? '0.8rem' : '1rem'
                    }}>Username</div>
                    {
                        isUsernameClicked &&
                        <input type="text" className="login-username" onChange={(e) => setUsername(e.target.value)} onClick={(e) => e.stopPropagation()}/>
                    }
                </div>
                <div className="password-container" onClick={() => setIsPasswordClicked(!isPasswordClicked)}>
                    <div className="password-input-container">
                        <div style={{
                            fontSize: isPasswordClicked ? '0.8rem' : '1rem'
                        }}>Password</div>
                        {
                            isPasswordClicked && 
                            <input type={ isShowClicked ? "text" : "password" } className="login-password" onChange={(e) => setPassword(e.target.value)} onClick={(e) => e.stopPropagation()}/>
                        }
                    </div>
                    <div className="show-password-btn" onClick={(e) => {
                        e.stopPropagation();
                        setIsShowClicked(!isShowClicked);
                    }}>Show</div>
                </div>
                <div className="link-container">
                    <a href="/">Forgot password?</a>
                    <a href="/signup">Signup</a>
                </div>
                <div className="checkbox-container">
                    <input type="checkbox" className="login-checkbox" id="login-checkbox"/>
                    <label htmlFor="login-checkbox">Remember Me</label>
                </div>
                <button className="login-btn" onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}