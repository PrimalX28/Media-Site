const DB = require("../models/cat");
const Helper = require("../utils/helper")

const all = async (req, res, next) => {
    let cats = await DB.find();
    Helper.fMsg(res, "All categories", cats)
}

const add = async (req, res, next) => {
    let dbCat = await DB.findOne({ name: req.body.name });
    if (dbCat) {
        next(new Error("Name is already in used"));
        return;
    }
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Category Save", result);
}

const get = async (req, res, next) => {
    let cat = await DB.findById(req.params.id);
    Helper.fMsg(res, "Single Category", cat)
}

//This is update for name
const patch = async (req, res, next) => {
    let dbCat = await DB.findById(req.params.id);
    if (dbCat) {
        await DB.findByIdAndUpdate(dbCat._id, req.body);
        let result = await DB.findById(dbCat._id);
        Helper.fMsg(res, "Updated Category", result)
    } else {
        next(new Error("No category with that id"));
    }
}

//This is update for image 
const patchImg = async (req, res, next) => {
    let dbCat = await DB.findById(req.params.id);
    if (dbCat) {
        await DB.findByIdAndUpdate(dbCat._id, req.body);
        let result = await DB.findById(dbCat._id);
        Helper.fMsg(res, "Updated Category", result)
    } else {
        next(new Error("No category with that id"));
    }
}

const drop = async (req, res, next) => {
    let db = await DB.findById(req.params.id);
    if (db) {
        await DB.findOneAndDelete(db._id);
        Helper.fMsg(res, "Deleted Category");
    } else {
        next(new Error("No category with that id"));
    }
}

module.exports = { all, add, get, patch, patchImg, drop }