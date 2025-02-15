import React from "react";
import { AiOutlineClose } from 'react-icons/ai'
import { Users } from "phosphor-react";
import { BiDownArrow } from "react-icons/bi";
import { BsImages } from "react-icons/bs"
import { useState } from 'react';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const PostForm = ({ onClose }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [caption, setCaption] = useState('');
    const fileInputRef = useRef(null);
    const navigate= useNavigate();


    const token= localStorage.getItem('accessToken');
    const decoded= jwtDecode(token);
    const username= decoded.user;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }

    const removeImage = () => {
        setSelectedImage(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('text', caption);
        formData.append('username', username);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        axios   
            .post('http://localhost:5000/posts', formData)
            .then((res) => {
                if (res.status === 201) {
                    console.log('Post created successfully')
                    window.location.reload();
                } else {
                    alert('Error: ' + res.data.message)
                }
            })
            .catch((e) => {
                console.error(e);
                alert('Error');
            })
    }
    return (
        <div className="form-container">
            <div className="form">
                <div className="form-header">
                    <p>Create Post</p>
                    <AiOutlineClose size={30} onClick={onClose} className="close-form-button"></AiOutlineClose>
                </div>
                <div className="form-user">
                    <div className="circle"></div>
                    <div className="form-user-info">
                        <div className="form-username">@{username}</div>
                        <div className="friends">
                            <Users size={15}></Users>
                            <p>Friends</p>
                            <BiDownArrow size={15}></BiDownArrow>
                        </div>
                    </div>
                </div>
                <div className="form-textarea-container">
                    <textarea name="" id="" className="form-textarea" placeholder="What do you think?" onChange={(e) => setCaption(e.target.value)}></textarea>
                    {selectedImage && (
                        <div className="image-preview">
                            <img src={URL.createObjectURL(selectedImage)} alt="Preview" />
                            <button onClick={() => removeImage()} className="remove-image-button">
                                <AiOutlineClose></AiOutlineClose>
                            </button>
                        </div>
                    )}
                </div>
                <div className="form-icons-container">
                    <p>Add to your post</p>
                    <label className="image-upload-label">
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                        <BsImages size={25}></BsImages>
                    </label>
                </div>
                <div className="form-submit-button-container">
                    <button className="form-submit-button" onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default PostForm