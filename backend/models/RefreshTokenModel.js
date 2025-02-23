import mongoose from "mongoose";

const refreshTokenSchema= mongoose.Schema(
    {
        token: {
            type: String,
            require: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            expires: '7d'
        }
    }
)

export const RefreshToken= mongoose.model('RefreshToken', refreshTokenSchema)