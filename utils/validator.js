const jwt = require('jsonwebtoken');
const UserDB = require('../models/user')

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body);
            if (result.error) {
                return res.status(400).json({ error: result.error.details[0].message });
            }
            next();
        };
    },

    validateParam: (schema, name) => {
        return (req, res, next) => {
            const obj = {};
            obj[name] = req.params[name];
            const result = schema.validate(obj);
            if (result.error) {
                return res.status(400).json({ error: result.error.details[0].message });
            }
            next();
        };
    },

    validateToken: async (req, res, next) => {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "Token is missing" });
        }
        token = token.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Invalid or expired token" });
            }
            req.user = decoded; // Optional: attach decoded user data to the request
            let user = await UserDB.findById(req.user._id);
            if (user) {
                req.body['user'] = user;
            } else {
                next(new Error('Tokenization Error'))
            }
            console.log(user);
            next();
        });
    }
};
