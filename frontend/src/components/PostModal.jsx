import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram, FaTwitter, FaSnapchat, FaWhatsapp } from "react-icons/fa";
import { BiUpArrow, BiDownArrow } from 'react-icons/bi'  // For up/down arrows
import { FaRegComment } from 'react-icons/fa'  // For comment icon
import { BsBookmark } from 'react-icons/bs'    // For bookmark icon
import { BsBookmarkFill } from "react-icons/bs";
import { FiLink } from 'react-icons/fi'        // For link/copy icon
import axios from "axios";
import { useSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";

const PostModal = ({ post, onClose }) => {

    const [isCommentClicked, setIsCommentClicked] = useState(false)
    const [comment, setComment] = useState('')

    const [isUpvoteClicked, setIsUpvoteClicked]= useState(false);
    const [isDownvoteClicked, setIsDownvoteClicked]= useState(false);
    const [isBookmarkClicked, setIsBookmarkClicked]= useState(false);

    const { enqueueSnackbar } = useSnackbar()
    const token= localStorage.getItem('accessToken');
    const decoded= jwtDecode(token);
    const username= decoded.user;

    const handleComment = () => {
        axios
            .post(`http://localhost:5000/posts/comments/${post._id}`, { comment,  username })
            .then(() => {
                console.log('Comment added successfully');
                enqueueSnackbar('Comment added successfully', { variant: 'success' });
            })
            .catch((error) => {
                console.error(error);
                enqueueSnackbar('Error', { variant: 'error' })
            })
    }

    return (
        <div className="post-modal" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-left">
                    <p>{post.user}</p>
                    <img src={`http://localhost:5000${post.image}`} alt="Image"
                        className="modal-image" />
                    <div>{post.description}</div>
                    <div className="modal-interact-container">
                        <div className="modal-up-down-container">
                            <div className="vote-container up-vote" onClick={() => {
                                setIsUpvoteClicked(!isUpvoteClicked);
                                setIsDownvoteClicked(false);
                            }}>
                                <BiUpArrow size={30} style={{
                                    color: isUpvoteClicked ? 'hsla(118, 100%, 68%)' : '#ddd'
                                }}></BiUpArrow>   
                            </div>
                            <div className="vote-container down-vote" onClick={() => {
                                setIsDownvoteClicked(!isDownvoteClicked);
                                setIsUpvoteClicked(false);
                            }}>
                                <BiDownArrow size={30} style={{
                                    color: isDownvoteClicked ? 'hsla(0, 100%, 68%)' : '#ddd'
                                }}></BiDownArrow>
                            </div>

                        </div>
                        <div className="modal-icon-comment-container interact-box" onClick={() => setIsCommentClicked(!isCommentClicked)}>
                            <FaRegComment size={30}></FaRegComment>
                            <p>Comment</p>
                        </div>
                        <div className="modal-icon-bookmark-container interact-box" onClick={() => setIsBookmarkClicked(!isBookmarkClicked)}>
                            { isBookmarkClicked ? (<BsBookmarkFill size={30} color="hsl(202, 100%, 58%)"/>) :
                            (<BsBookmark size={30}/>)}
                            <p>Bookmark</p>
                        </div>
                        <div className="modal-icon-copy-container interact-box">
                            <FiLink size={30}></FiLink>
                            <p>Copy</p>
                        </div>
                    </div>
                </div>
                <div className="modal-right">
                    <div className="close-button-container">
                        <AiOutlineClose onClick={onClose} className="close-button"></AiOutlineClose>
                    </div>
                    <div className="suggested-accounts">
                        <div className="account">
                            <div className="circle"></div>
                            <div className="info-container">
                                <div className="nickname">Viktornation</div>
                                <div className="username">@viktor</div>
                            </div>
                            <div className="follow-button">Follow</div>
                        </div>
                        <div className="account">
                            <div className="circle"></div>
                            <div className="info-container">
                                <div className="nickname">Ambessasy</div>
                                <div className="username">@ambessa</div>
                            </div>
                            <div className="follow-button">Follow</div>
                        </div>
                    </div>
                    <div className="suggested-share">
                        <FaFacebook className="icon facebook" size={30}></FaFacebook>
                        <FaInstagram className="icon instagram" size={30}></FaInstagram>
                        <FaTwitter className="icon twitter" size={30}></FaTwitter>
                        <FaWhatsapp className="icon whatsapp" size={30}></FaWhatsapp>
                        <FaSnapchat className="icon snapchat" size={30}></FaSnapchat>
                    </div>
                    {isCommentClicked && (
                        <form>
                            <div>
                                <textarea type="text" className="comment-textarea" placeholder="Enter your comment..." onChange={(e) => setComment(e.target.value)} />
                            </div>
                            <button className="submit-button" onClick={handleComment}>Submit</button>
                        </form>
                    )}
                    {(post.comments.length > 0) && <div className="comments-container">
                        <p>Comments:</p>
                        {post.comments.map((item, index) => (
                            <div className="comment" key={index}>
                                @{item.username}: {item.comment} 
                            </div>
                        ))}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default PostModal