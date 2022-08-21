const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const upload = require('../middlewares/multerMiddleware');
const validation = require('../middlewares/validationMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

let validateRegister = validation.validateRegister;
let validateLogin = validation.validateLogin;

router.get('/profile',authMiddleware, usersController.profile)
router.get('/login',guestMiddleware, usersController.login)
router.get('/create',guestMiddleware, usersController.viewCreate);
router.get('/', authMiddleware,usersController.users);
router.get('/edit/:id',authMiddleware, usersController.edit)
router.get('/logout', usersController.logout)

router.post('/create', upload.single('image'), validateRegister, usersController.create);
router.post('/profile', validateLogin, usersController.processLogin)

router.put('/edit/:id', upload.single('image'), usersController.update)

router.delete('/eliminar/:id',authMiddleware, usersController.delete);

module.exports = router;