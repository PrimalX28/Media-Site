const router = require('express').Router();
const controller = require('../controllers/post')
const { validateToken, validateBody, validateParam } = require('../utils/validator')
const { Schema } = require('../utils/schema')
const { saveFile } = require('../utils/gallery')


router.route("/")
    .get(controller.all)
    .post(validateToken, saveFile, validateBody(Schema.PostSchema), controller.post)


router.route("/:id")
    .get(controller.get)
    .patch(validateToken, controller.patch)
    .delete(validateToken, controller.drop)


router.get('/bycat/:id', [validateParam(Schema.AllSchema.id, 'id'), controller.byCat])
router.get('/byuser/:id', [validateParam(Schema.AllSchema.id, 'id'), controller.byUser])
router.get('/bytag/:id', [validateParam(Schema.AllSchema.id, 'id'), controller.byTag])
router.get('/like/toggle/:id/:page', [validateParam(Schema.AllSchema.id, 'id'), controller.toggleLike])
router.get('/paginate/:page', [validateParam(Schema.AllSchema.page, 'page'), controller.paginate])

module.exports = router;