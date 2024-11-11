const DB = require("../models/post");
const CommentDB = require('../models/comment');
const Helper = require("../utils/helper")

const all = async (req, res, next) => {
    let post = await DB.find().populate("user cat", "-password -__v");
    Helper.fMsg(res, "Get all Post", post)
};

const get = async (req, res, next) => {
    // let post = await DB.findById(req.params.id).populate('user tag cat', '-__v -_id -password -created');
    let post = await DB.findById(req.params.id).select('title desc');
    let comments = await CommentDB.find({ postId: post._id })
    post = post.toObject();
    post.comments = comments;
    Helper.fMsg(res, "Get single post", post)
}

const post = async (req, res, next) => {
    let userId = req.body.user._id;
    delete req.body.user

    req.body.user = userId;
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Add new Post", result)
}

const patch = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        await DB.findByIdAndUpdate(post._id, req.body);
        let result = await DB.findById(post._id);
        Helper.fMsg(res, "Update Post", result)
    } else {
        next(new Error("No post with that id"))
    }
}
const drop = async (req, res) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        await DB.findByIdAndDelete(post._id)
        Helper.fMsg(res, "Post Deleted");
    } else {
        next(new Error("No post with that id"))
    }
}

const byCat = async (req, res, next) => {
    let posts = await DB.find({ cat: req.params.id })
    if (posts) {
        Helper.fMsg(res, 'Get Post By Category', posts)
    } else {
        next(new Error('No Post with that Category'))
    }
}

const byUser = async (req, res, next) => {
    let posts = await DB.find({ user: req.params.id }).populate('user')
    Helper.fMsg(res, 'Get Posts By Users', posts)
}
const byTag = async (req, res, next) => {
    let posts = await DB.find({ tag: req.params.id })
    if (posts) {
        Helper.fMsg(res, 'Get Posts By Tags', posts)
    } else {
        next(new Error('No posts with that tag id'))
    }
}

const paginate = async (req, res, next) => {
    let page = req.params.page;
    page = page == 1 ? 0 : page - 1;

    let limit = Number(process.env.POST_LIMIT);
    let skipCount = limit * page;
    let posts = await DB.find().skip(skipCount).limit(limit)

    Helper.fMsg(res, 'Paginated Posts', posts)
}

const toggleLike = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        if (req.params.page == 1) {
            post.like = post.like + 1;
        } else {
            post.like = post.like == 0 ? 0 : post.like - 1;
        }
        await DB.findByIdAndUpdate(post._id, post)
        let result = await DB.findById(post._id)
        Helper.fMsg(res, 'Add Like', result)
    } else {
        next(new Error('No post with that Id'))
    }
}


module.exports = {
    all,
    get,
    post,
    patch,
    drop,
    byCat,
    byUser,
    byTag,
    toggleLike,
    paginate
}