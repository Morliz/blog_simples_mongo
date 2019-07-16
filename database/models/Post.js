// import mongoose
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    // fields or properties of Schema
    title: String,
    description: String,
    content: String,
    author: String,
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post