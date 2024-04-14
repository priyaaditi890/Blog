const mongoose = require('mongoose');

// Define the schema for the Post model
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
delete mongoose.connection.models['Post'];