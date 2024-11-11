const Joi = require('joi');

module.exports = {
    Schema: {
        AddCat: Joi.object({
            name: Joi.string().required(),
            image: Joi.string().required(),
            user: Joi.optional()
        }),
        AllSchema: {
            id: Joi.object({
                id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            }),
            // image: Joi.object({
            //     image: Joi.string().required()
            // }),
            page: Joi.object({
                page: Joi.number().required()
            })
        },
        RegisterSchema: Joi.object({
            name: Joi.string().max(25).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(8).max(11).required(),
            password: Joi.string().required().min(6).max(25)
        }),
        PostSchema: Joi.object({
            cat: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            tag: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            image: Joi.string(),
            title: Joi.string().required(),
            desc: Joi.string().required(),
            user: Joi.optional()
        }),
        TagSchema: {
            add: Joi.object({
                name: Joi.string().required(),
                image: Joi.string().required(),
                user: Joi.optional()
            })
        },
        CommentSchema: Joi.object({
            postId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            name: Joi.string().required(),
            content: Joi.string().required(),
            email: Joi.string().email().required(),
            // user: Joi.optional()

        })
    }
}