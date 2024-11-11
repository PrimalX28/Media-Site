// const express = require("express");
// const router = express.Router();

const router = require('express').Router();
const controller = require('../controllers/user');
const { Schema } = require('../utils/schema')
const { validateBody } = require('../utils/validator')


router.post('/', controller.login)
router.post('/register', [validateBody(Schema.RegisterSchema), controller.register])


// router.get("/", (req, res) => 
//     res.json({
//         msg: "All users"
//     })
// })

// router.get("/:id", (req, res) => {
//     let id = req.params.id;
//     res.json({ msg: "The request id is " + id })
// })

// router.post("/", (req, res) => {
//     res.json(req.body)
// })

// router.patch("/:id", (req, res) => {
//     let id = req.params.id;
//     res.json({
//         msg: "Edit id is " + id,
//     })
// })

// router.delete("/:id", (req, res) => {
//     let id = req.params.id;
//     res.json({
//         msg: "Delete is is " + id
//     })
// })

module.exports = router;