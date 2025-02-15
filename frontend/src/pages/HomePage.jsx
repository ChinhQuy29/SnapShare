import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import PostsCard from '../components/PostsCard.jsx';
import LoadingCard from '../components/LoadingCard.jsx';
import SideBar from '../components/SideBar.jsx';
import NavigationBar from '../components/NavigationBar.jsx';
import 'D:/MERNProjects/1/backend/public/style.css';

export const HomePage = () => {
    const [posts, setPosts]= useState([]);
    const [loading, setLoading]= useState(false);


    useEffect(() => {
        setLoading(true)
        fetchPosts();
    }, [])  

    const fetchPosts = async () => {
        setLoading(true)
        try {
            const response= await axios.get('http://localhost:5000/posts');
            setPosts(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <NavigationBar></NavigationBar>
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <SideBar></SideBar>
                <main style={{ flex: 1, overflow: 'auto'}}>
                     <PostsCard posts={posts}/>
                </main>
            </div>
        </div>
    )
}