const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, require: true, ref: 'user' },
    cat: { type: Schema.Types.ObjectId, require: true, ref: 'cat' },
    tag: { type: Schema.Types.ObjectId, require: true, ref: 'tag' },
    like: { type: Number, default: 0 },
    image: { type: String, require: true },
    title: { type: String, require: true },
    desc: { type: String, require: true },
    create: { type: Date, default: Date.now },
})

const Post = mongoose.model("post", PostSchema);
module.exports = Post;