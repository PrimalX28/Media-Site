const Helper = require('../utils/helper')
const DB = require('../models/tag')


const get = async (req, res, next) => {
    let tags = await DB.find()
    Helper.fMsg(res, 'Get All Tags', tags)
}

const add = async (req, res, next) => {
    let tag = await DB.findOne({ name: req.body.name })
    if (tag) {
        next(new Error('Your tag name is alrady in used'))
    } else {
        let result = await new DB(req.body).save();
        Helper.fMsg(res, 'Add tag', result)
    }
}

module.exports = { get, add }