const router = require('express').Router()
const controller = require('../controllers/comment')
const { validateBody, validateParam, validateToken } = require('../utils/validator')
const { Schema } = require('../utils/schema')


router.post('/', validateBody(Schema.CommentSchema), controller.add)

router.get('/:id', [validateParam(Schema.AllSchema.id, 'id'), controller.all])
router.delete('/:id', [validateParam(Schema.AllSchema.id, 'id'), validateToken, controller.drop])

module.exports = router;