const mongoose = require('mongoose')
const { Schema } = mongoose;


const CommentSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    content: { type: String, require: true },
    created: { type: Date, default: Date.now }
})

const Comment = mongoose.model("comment", CommentSchema)

module.exports = Comment;