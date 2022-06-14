const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 30,
        trim: trime
    },
    description: {
        type: String,
        minlength: 500,
        required: true,
        trim: true
    },
    img: [{
        type: Buffer
    }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
