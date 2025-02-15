import mongoose, { mongo } from "mongoose";
import { Post } from "./PostModel.js";

const userSchema = mongoose.Schema(
    {
        'username': {
            type: String,
            required: true,
        },
        'password': {
            type: String,
            required: true,
        },
        'created': {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Post',
            required: false,
        },
        'shared': {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Post',
            required: false,
        },
        'liked': {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Post',
            required: false,
        },
        'bookmarked': {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Post',
            required: false,
        }
    }
)

export const User= mongoose.model('User', userSchema)