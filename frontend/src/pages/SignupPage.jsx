import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [isUsernameClicked, setIsUsernameClicked] = useState(false);
    const [isPasswordClicked, setIsPasswordClicked] = useState(false);
    const [isShowClicked, setIsShowClicked] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate= useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:5000/users/signup', { username, password });
            if (response.status !== 200) {
                alert(response.data.message);
            } else {
                alert('Signup successfully');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login-form-container">
            <div className="login-form">
                <h2>Signup</h2>
                <div className="username-container" onClick={() => setIsUsernameClicked(!isUsernameClicked)}>
                    <div style={{
                        fontSize: isUsernameClicked ? '0.8rem' : '1rem'
                    }}>Username</div>
                    {
                        isUsernameClicked &&
                        <input type="text" className="login-username" onChange={(e) => setUsername(e.target.value)} onClick={(e) => e.stopPropagation()} />
                    }
                </div>
                <div className="password-container" onClick={() => setIsPasswordClicked(!isPasswordClicked)}>
                    <div className="password-input-container">
                        <div style={{
                            fontSize: isPasswordClicked ? '0.8rem' : '1rem'
                        }}>Password</div>
                        {
                            isPasswordClicked &&
                            <input type={isShowClicked ? "text" : "password"} className="login-password" onChange={(e) => setPassword(e.target.value)} onClick={(e) => e.stopPropagation()} />
                        }
                    </div>
                    <div className="show-password-btn" onClick={(e) => {
                        e.stopPropagation();
                        setIsShowClicked(!isShowClicked);
                    }}>Show</div>
                </div>
                <div className="checkbox-container">
                    <input type="checkbox" className="login-checkbox" id="login-checkbox" />
                    <label htmlFor="login-checkbox signup-checkbox">Remember Me</label>
                </div>
                <button className="login-btn signup-btn" onClick={handleSignup}>Agree & Join</button>
            </div>
        </div>
    )
}

export default SignupPage