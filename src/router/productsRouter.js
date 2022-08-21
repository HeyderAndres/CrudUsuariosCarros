const express = require('express');
const router = express.Router();
const validations = require('../middlewares/validationMiddleware')
const multerUpload = require('../middlewares/productMulterMiddleware')
const productsController = require('../controllers/productsController')

router.get('/', productsController.allProducts)
router.get('/detail/:id', productsController.detailProduct)
router.get('/create',productsController.createProduct)
router.get('/edit/:id', productsController.editProduct)

router.post('/create',multerUpload.single('imagen'),validations.validateCreateProduct,productsController.processCreateProduct)

router.put('/edit/:id',multerUpload.single('imagen'),validations.validateCreateProduct,productsController.processEditProduct)

router.delete('/delete/:id',productsController.delete)



module.exports = router;