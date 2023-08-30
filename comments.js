// Create web server application for handling comments

// Import modules
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const auth = require('../middlewares/auth');

// Handle GET request to get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.json({message: err});
    }
});

// Handle GET request to get comment by id
router.get('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        res.json(comment);
    } catch (err) {
        res.json({message: err});
    }
});

// Handle POST request to add new comment
router.post('/', auth, async (req, res) => {
    const comment = new Comment({
        content: req.body.content,

