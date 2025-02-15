import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import NavigationBar from "../components/NavigationBar.jsx";
import SideBar from "../components/SideBar.jsx";
import { FaUserPlus } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import PostsCard from "../components/PostsCard.jsx";
import axios from 'axios'

const ProfilePage = () => {
    const [createdPostsId, setCreatedPostsId] = useState([]);
    const [likedPostsId, setLikedPostsId] = useState([]);
    const [sharedPostsId, setSharedPostsId] = useState([]);
    const [bookmarkedPostsId, setBookmarkedPostsId] = useState([]);

    const [posts, setPosts] = useState([]);

    const accessToken = localStorage.getItem("accessToken");
    const decoded = jwtDecode(accessToken);
    const user = decoded.user;

    const [isPostsClicked, setIsPostsClicked] = useState(true);
    const [isLikesClicked, setIsLikesClicked] = useState(false);
    const [isSharesClicked, setIsSharesClicked] = useState(false);
    const [isBookmarksClicked, setIsBookmarksClicked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await fetchPosts();
            await fetchUser();
        };
        fetchData();
    }, [])

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/posts');
            let postsArray = response.data.data;
            setPosts(postsArray);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/user?username=${user}`)
            let fetched_user = response.data.data;
            setCreatedPostsId(fetched_user.created || [])
            setLikedPostsId(fetched_user.liked || [])
            setSharedPostsId(fetched_user.shared || [])
            setBookmarkedPostsId(fetched_user.bookmarked || [])
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <NavigationBar></NavigationBar>
            <div style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden', height: '100vh' }}>
                <SideBar></SideBar>
                <div style={{ flex: 1, overflow: 'auto', color: 'white', flexDirection: 'column' }}>
                    <div className="background-img">
                        <div className="profile-img circle"></div>
                    </div>
                    <div className="invicible-div"></div>
                    <div className="user-profile">
                        <p className="user-profile-username">@{user}</p>
                        <div className="user-profile-icons">
                            <div className="profile-icon-container">
                                <FaUserPlus size={20} className="icon"></FaUserPlus>
                            </div>
                            <div className="profile-icon-container">
                                <FaShare size={20} className="icon"></FaShare>
                            </div>
                            <div className="profile-icon-container">
                                <BsThreeDots size={20} className="icon"></BsThreeDots>
                            </div>
                        </div>
                    </div>
                    <div className="profile-nav-bar">
                        <div className="nav-item" onClick={() => {
                            setIsPostsClicked(true);
                            setIsLikesClicked(false);
                            setIsSharesClicked(false);
                            setIsBookmarksClicked(false);
                        }} style={{ backgroundColor: isPostsClicked ? "#b3b3b3" : "#ddd" }}>Posts</div>
                        <div className="nav-item" onClick={() => {
                            setIsPostsClicked(false);
                            setIsLikesClicked(false);
                            setIsSharesClicked(true);
                            setIsBookmarksClicked(false);
                        }} style={{ backgroundColor: isSharesClicked ? "#b3b3b3" : "#ddd" }}>Shares</div>
                        <div className="nav-item" onClick={() => {
                            setIsPostsClicked(false);
                            setIsLikesClicked(true);
                            setIsSharesClicked(false);
                            setIsBookmarksClicked(false);
                        }} style={{ backgroundColor: isLikesClicked ? "#b3b3b3" : "#ddd" }}>Likes</div>
                        <div className="nav-item" onClick={() => {
                            setIsPostsClicked(false);
                            setIsLikesClicked(false);
                            setIsSharesClicked(false);
                            setIsBookmarksClicked(true);
                        }} style={{ backgroundColor: isBookmarksClicked ? "#b3b3b3" : "#ddd" }}>Bookmarks</div>
                    </div>
                    <main style={{ flex: 1, overflow: 'auto' }}>
                        { isPostsClicked && <PostsCard posts={posts.filter(post => createdPostsId?.includes(post._id))} /> }
                        { isSharesClicked && <PostsCard posts={posts.filter(post => sharedPostsId?.includes(post._id))} /> }
                        { isLikesClicked && <PostsCard posts={posts.filter(post => likedPostsId?.includes(post._id))} /> }
                        { isBookmarksClicked && <PostsCard posts={posts.filter(post => bookmarkedPostsId?.includes(post._id))} /> }
                    </main>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;