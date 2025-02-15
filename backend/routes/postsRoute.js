import { Post } from '../models/PostModel.js';
import { User } from '../models/UserModel.js';
import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage })

router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({});

        return res.status(200).send({
            count: posts.length,
            data: posts,
        })
    } catch (error) {
        console.log(error);
        alert("Error");
        return res.status(500).send({
            message: error,
        })
    }
})

router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (
            !req.body.text &&
            !req.body.username
        ) {
            return res.status(400).send({
                message: "Missing information!"
            })
        }

        const newPost = {
            image: req.file ? `/public/images/${req.file.filename}` : null,
            user: "@" + req.body.username,
            caption: req.body.text,
        }

        const post = await Post.create(newPost);

        const user = await User.updateOne(
            { username: req.body.username },
            { $push: { created: post } },
            { new: true }
        );

        return res.status(201).send({
            message: "Post created successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: error,
        })
    }
})

router.route('/:id').put(async (req, res) => {
    try {
        if (
            !req.body.image ||
            !req.body.user ||
            !req.body.caption
        ) {
            return res.status(400).send({
                message: "Missing Information!"
            })
        }

        const { id } = req.params;

        const result = await Post.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(404).send({
                message: "Post not found!"
            })
        } else {
            return res.status(200).send({
                message: "Post updated successfully!"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error,
        })
    }
})

router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Post.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({
                message: "Post not found!"
            })
        } else {
            return res.status(200).send({
                message: "Post deleted successfully!"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error,
        })
    }
})

router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).send({
                message: "Post not found"
            })
        }

        return res.status(200).send({
            data: post
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error
        })
    }
})

router.post('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { comment, username } = req.body;

        const post = await Post.findByIdAndUpdate(
            id,
            { $push: { comments: { comment: comment, username: username } } },
            { new: true }
        )
        if (!post) {
            return req.status(404).send({
                message: 'Post not found'
            })
        } else {
            return res.status(201).send({
                message: 'Comment added successfully'
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: error
        })
    }
})

router.post('/liked/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const username = req.body.username;
        if (!username) {
            return res.status(404).send({
                message: "Information Missing",
            })
        }

        if (!id) {
            return res.status(404).send({
                message: "Information Missing",
            })
        }

        const user = await User.findOne({ username: username });
        const post = await Post.findById(id);

        if (!user) {
            return res.status(404).send({
                message: "User not found",
            })
        }

        if (!post) {
            return res.status(404).send({
                message: "Post not found",
            })
        }

        post.liked.push(user);
        user.liked.push(post);

        await post.save();
        await user.save();

        return res.status(200).send({
            data: user.liked,
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message,
        })
    }
})

router.post('/shared/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const username = req.body.username;
        if (!username) {
            return res.status(404).send({
                message: "Information Missing",
            })
        }

        if (!id) {
            return res.status(404).send({
                message: "Information Missing",
            })
        }

        const user = await User.findOne({ username: username });
        const post = await Post.findById(id);

        if (!user) {
            return res.status(404).send({
                message: "User not found",
            })
        }

        if (!post) {
            return res.status(404).send({
                message: "Post not found",
            })
        }

        post.shared.push(user);
        user.shared.push(post);

        await post.save();
        await user.save();

        return res.status(200).send({
            message: user.shared,
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        })
    }
})

router.post('/bookmarked/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const username = req.body.username;
        if (!username) {
            return res.status(404).send({
                message: "Information Missing",
            })
        }

        if (!id) {
            return res.status(404).send({
                message: "Information Missing",
            })
        }

        const user = await User.findOne({ username: username });
        const post = await Post.findById(id);

        if (!user) {
            return res.status(404).send({
                message: "User not found",
            })
        }

        if (!post) {
            return res.status(404).send({
                message: "Post not found",
            })
        }

        post.bookmarked.push(user);
        user.bookmarked.push(post);

        await post.save();
        await user.save();

        return res.status(200).send({
            data: user.bookmarked,
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        })
    }
})


router.post('/unliked/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const username = req.body.username;
        if (!username) {
            return res.status(404).send({
                message: "Information Missing",
            })
        }

        if (!id) {
            return res.status(404).send({
                message: "Information Missing",
            })
        }

        const user = await User.findOne({ username: username });
        const post = await Post.findById(id);

        if (!user) {
            return res.status(404).send({
                message: "User not found",
            })
        }

        if (!post) {
            return res.status(404).send({
                message: "Post not found",
            })
        }

        post.liked= post.liked.filter(userId => userId.toString() !== user._id.toString());
        user.liked= user.liked.filter(postId => postId.toString() !== post._id.toString());

        await post.save();
        await user.save();

        return res.status(200).send({
            data: user.liked,
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message,
        })
    }
})

router.post('/unshared/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const username = req.body.username;
        if (!username) {
            return res.status(404).send({
                message: "Information Missing",
            })
        }

        if (!id) {
            return res.status(404).send({
                message: "Information Missing",
            })
        }

        const user = await User.findOne({ username: username });
        const post = await Post.findById(id);

        if (!user) {
            return res.status(404).send({
                message: "User not found",
            })
        }

        if (!post) {
            return res.status(404).send({
                message: "Post not found",
            })
        }

        post.shared= post.shared.filter(userId => userId.toString() !== user._id.toString());
        user.shared= user.shared.filter(postId => postId.toString() !== post._id.toString());

        await post.save();
        await user.save();

        return res.status(200).send({
            data: user.shared,
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        })
    }
})

router.post('/unbookmarked/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const username = req.body.username;
        if (!username) {
            return res.status(404).send({
                message: "Information Missing",
            })
        }

        if (!id) {
            return res.status(404).send({
                message: "Information Missing",
            })
        }

        const user = await User.findOne({ username: username });
        const post = await Post.findById(id);

        if (!user) {
            return res.status(404).send({
                message: "User not found",
            })
        }

        if (!post) {
            return res.status(404).send({
                message: "Post not found",
            })
        }

        post.bookmarked= post.bookmarked.filter(userId => userId.toString() !== user._id.toString());
        user.bookmarked= user.bookmarked.filter(postId => postId.toString() !== post._id.toString());

        await post.save();
        await user.save();

        return res.status(200).send({
            data: user.bookmarked,
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        })
    }
})

export default router;

