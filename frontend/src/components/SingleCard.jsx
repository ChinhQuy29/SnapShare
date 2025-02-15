import React, { useEffect } from 'react'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'  // Like icons
import { FaRegComment } from 'react-icons/fa'               // Comment icon
import { RiShareForwardLine } from 'react-icons/ri'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { useState } from 'react'
import PostModal from './PostModal.jsx'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { jwtDecode } from 'jwt-decode'

const SingleCard = ({ post }) => {
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token);
    const username = decoded.user;

    const [isLikeClicked, setIsLikeClicked] = useState(false);
    const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);

    const [likedPosts, setLikedPosts] = useState([]);
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [isCardHovered, setIsCardHovered] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const handleDelete = (event) => {
        event.stopPropagation();
        axios
            .delete(`http://localhost:5000/posts/${post._id}`)
            .then(() => {
                console.log('Post deleted successfully');
                enqueueSnackbar('Post deleted successfully', { variant: 'success' });
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleLike = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/posts/liked/${post._id}`, { username: username })
            setLikedPosts(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleBookmark = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/posts/bookmarked/${post._id}`, { username: username })
            setBookmarkedPosts(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleUnlike = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/posts/unliked/${post._id}`, { username: username })
            setLikedPosts(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleUnbookmark = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/posts/unbookmarked/${post._id}`, { username: username })
            setBookmarkedPosts(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/user?username=${username}`);
                const user = response.data.data;
                setLikedPosts(user.liked);
                setBookmarkedPosts(user.bookmarked);
                setIsLikeClicked(likedPosts.includes(post._id));
                setIsBookmarkClicked(bookmarkedPosts.includes(post._id));
            } catch (error) {
                console.log(error.message); 
            }
        }

        fetchUser();
    }, [post._id, token])

    return (
        <div className='card'
            onClick={() => setShowModal(true)}
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
        >
            <img
                src={`http://localhost:5000${post.image}`}
                alt="Image"
                className='card-image'
            />
            {isCardHovered && (
                <div className='card-header'>
                    <div className='card-header-username'>{post.user}</div>
                    <div className='card-header-icon-container'>
                        <AiOutlineDelete size={20} className='card-header-delete-icon' onClick={handleDelete}></AiOutlineDelete>
                    </div>
                </div>

            )}
            {isCardHovered && (
                <div className='icon-container'>
                    <div className='like icon-box' onClick={(event) => {
                        event.stopPropagation();
                        if (isLikeClicked === true) {
                            setIsLikeClicked(false);
                            handleUnlike();
                        } else {
                            setIsLikeClicked(true);
                            handleLike();
                        }
                    }}>
                        {isLikeClicked ?
                            <AiFillLike style={{ fontSize: '24px', cursor: 'pointer', color: 'hsl(202, 100%, 58%)' }} /> :
                            <AiOutlineLike style={{ fontSize: '24px', cursor: 'pointer', color: 'white' }} />}
                    </div>
                    <div className='comment icon-box'>
                        <FaRegComment style={{
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: 'white',
                        }} />
                    </div>
                    <div className='bookmark icon-box' onClick={(event) => {
                        event.stopPropagation();
                        if (isBookmarkClicked === true) {
                            setIsBookmarkClicked(false);
                            handleUnbookmark();
                        } else {
                            setIsBookmarkClicked(true);
                            handleBookmark();
                        }
                    }}>
                        {isBookmarkClicked ?
                            <BsFillBookmarkFill style={{ fontSize: '24px', cursor: 'pointer', color: 'hsl(202, 100%, 58%)' }} /> :
                            <BsBookmark style={{ fontSize: '24px', cursor: 'pointer', color: 'white' }} />}
                    </div>

                    <div className='share icon-box'>
                        <RiShareForwardLine style={{
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: 'white',
                        }} />
                    </div>
                </div>
            )}
            {showModal && (
                <PostModal post={post} onClose={() => setShowModal(false)}></PostModal>
            )}
        </div>
    )
}

export default SingleCard



