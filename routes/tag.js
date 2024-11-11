const router = require('express').Router()
const controller = require('../controllers/tag')
const { saveFile } = require('../utils/gallery')
const { validateToken, validateBody } = require('../utils/validator')
const { Schema } = require('../utils/schema')

router.get('/', controller.get)
router.post('/', [validateToken, saveFile, validateBody(Schema.TagSchema.add), controller.add])

module.exports = router;