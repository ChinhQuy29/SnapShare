import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

export const ProtectedRoute = ({ children }) => {
    let accessToken;

    const fetchNewAccessToken = async () => {
        try {
            const response = await axios.post('http://localhost:5000/users/refresh', {}, {
                withCredentials: true,
            })
            if (response.status === 201) {
                return response.data.accessToken;
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    try {
        accessToken = localStorage.getItem("accessToken");
    } catch (error) {
        console.log(error.message)
    }
    if (!accessToken) {
        console.log('Access Token Missing');
        return <Navigate to='/login' replace />;
    }

    try {
        const decoded = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.log('Access Token Expired');
            // try {
            //     accessToken = fetchNewAccessToken();
            //     console.log(accessToken);
            //     if (!accessToken) {
            //         return <Navigate to='/login' replace />
            //     }
            //     localStorage.setItem('accessToken', accessToken);
            // } catch(error) {
            //     console.log(error.message);
            //     return <Navigate to='/login' replace/>
            // }
            return <Navigate to='/login' replace/>
        }
    } catch (error) {
        console.log(error.message);
        return <Navigate to='/login' replace></Navigate>
    }

    return children;
}


