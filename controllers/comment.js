const DB = require('../models/comment')
const Helper = require('../utils/helper')


let all = async (req, res, next) => {
    let comments = await DB.find({ postId: req.params.id })
    Helper.fMsg(res, 'All Comments by Post Id', comments)
}

let add = async (req, res, next) => {
    let comment = await new DB(req.body).save();
    Helper.fMsg(res, "Add comment", comment)
}

let drop = async (req, res, next) => {
    let comId = await DB.findById(req.params.id);
    if (comId) {
        await DB.findByIdAndDelete(comId._id)
        Helper.fMsg(res, 'Comment Deleted');

    } else {
        next(new Error('No Comment with that id'))
    }
}

module.exports = {
    all,
    add,
    drop
}