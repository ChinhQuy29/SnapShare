import { User } from "../models/UserModel.js";
import { RefreshToken } from "../models/RefreshTokenModel.js";
import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config();

const router = express.Router();

const generateAccessToken = (user) => {
    return jwt.sign({ user: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const generateRefreshToken = (user) => {
    return jwt.sign({ user: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

router.post('/login', async (req, res) => {
    if (
        !req.body.username ||
        !req.body.password
    ) {
        return res.status(400).send({
            message: "Credentials missing"
        })
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username: username })
    if (!user) {
        return res.status(404).send({
            message: "Incorrect credentials"
        })
    }
    try {
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({
                message: "Incorrect credentials"
            })
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        const newRefreshToken = new RefreshToken({ token: refreshToken, userId: user._id });
        await newRefreshToken.save();



        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ accessToken })
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

})

router.post('/signup', async (req, res) => {
    if (
        !req.body.username ||
        !req.body.password
    ) {
        return res.status(400).send({
            message: "Credentials missing"
        })
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username: username })
    if (user) {
        return res.status(403).send({
            message: "Username already exists"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({ username: username, password: hashedPassword })
    await newUser.save();

    return res.status(200).send({
        message: "User created successfully",
    })
})

router.post('/refresh', async (req, res) => {
    console.log('Request Headers: ', req.headers);
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(404).send({
            message: "Refresh token missing"
        })
    }

    const token = await RefreshToken.findOne({ token: refreshToken })
    if (!token) {
        return res.status(403).send({
            message: "Invalid refresh token"
        })
    }

    try {
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const accessToken = generateAccessToken(user)
        return res.status(201).json({ accessToken });
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.post('/logout', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(404).send({
            message: "Refresh Token not found"
        })
    }

    await RefreshToken.findOneAndDelete({ token: refreshToken });
    res.clearCookie('refreshToken');
    res.status(201).send({
        message: "Logged out successfully"
    })
})

router.get('/', async(req, res) => {
    try {
        const users= await User.find({});

        return res.status(200).send({
            data: users,
        })
    } catch(error) {
        return res.status(500).json({
            message: error.message,
        })
    }
})

router.get('/user', async(req, res) => {
    try {
        const username= req.query.username;
        const user= await User.findOne({ username : username })

        if (!user) {
            return res.status(404).send({
                message: "User not found",
            })
        }

        return res.status(200).json({
            data: user,
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        })
    }
})

export default router;