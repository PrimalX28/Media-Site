const router = require('express').Router();
const controller = require('../controllers/cat');
const { saveFile } = require('../utils/gallery');
const { Schema } = require('../utils/schema');
const { validateBody, validateParam, validateToken } = require('../utils/validator')

router.get("/", controller.all);
router.post("/", [validateToken, saveFile, validateBody(Schema.AddCat), controller.add])

router.route('/:id')
    .get(validateParam(Schema.AllSchema.id, "id"), controller.get)
    .patch(validateToken, validateParam(Schema.AllSchema.id, 'id'), controller.patch)
    .patch(validateToken, saveFile, validateBody(Schema.AllSchema.image), controller.patch)
    .delete(validateToken, validateParam(Schema.AllSchema.id, "id"), controller.drop)




//.patch(validateParam(Schema.AllSchema.id, "id"), controller.patch)

module.exports = router;
