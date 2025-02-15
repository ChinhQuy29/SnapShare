import mongoose from "mongoose";
import { User } from "./UserModel.js";

const postSchema= mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            required: true, 
        },
        caption: {
            type: String,
            required: true,
        },
        comments: {
            type: [{
                comment: { type: String, required: true },
                username: { type: String, required: true }
            }],
            required: false,
        },
        liked: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            required: false,
        },
        shared: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            required: false,
        },
        bookmarked: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            required: false,
        }
    }
)


export const Post= mongoose.model('Post', postSchema);