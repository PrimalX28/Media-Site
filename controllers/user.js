const DB = require("../models/user");
const Helper = require('../utils/helper');

const login = async (req, res, next) => {
    let phoneUser = await DB.findOne({ phone: req.body.phone }).select("-__v")
    if (phoneUser) {
        if (Helper.comparePass(req.body.password, phoneUser.password)) {
            let user = phoneUser.toObject();
            delete user.password

            let token = Helper.makeToken(user)
            user.token = token;

            Helper.fMsg(res, "Login Success", user)
        } else {
            next(new Error("Credential Error"))
        }
    } else {
        next(new Error("Credential Error"))
    }

}
const register = async (req, res, next) => {

    let name = await DB.findOne({ name: req.body.name });
    if (name) {
        next(new Error("Üser name is already in used"))
        return;
    }

    let userEmail = await DB.findOne({ email: req.body.email });
    if (userEmail) {
        next(new Error("Üser email is already in used"))
        return;
    }

    let userPhone = await DB.findOne({ phone: req.body.phone });
    if (userPhone) {
        next(new Error("Phone is already in used"))
        return;
    }



    req.body.password = Helper.encode(req.body.password);
    let result = await new DB(req.body).save()
    Helper.fMsg(res, "Register Success", result)
}



module.exports = {
    login, register
}