const { body } = require('express-validator')
const validation = {
validateRegister : [
    body('nombre').notEmpty().withMessage('el campo nombre es obligatorio'),
    body('apellido')
        .notEmpty().withMessage('el campo apellido es obligatorio'),
    body('email')
        .notEmpty().withMessage('el campo email es obligatorio').bail()
        .isEmail().withMessage('debe ingesar un email valido'),
    body('password')
        .notEmpty().withMessage('el campo password es obligatorio').bail()
        .isLength({ min: 8, max: 20 }).withMessage('el campo debe contener minimo 8c aracteres maximo 20')
],

validateLogin : [
    body('email')
        .notEmpty().withMessage('el campo email es obligatorio').bail()
        .isEmail().withMessage('debe ingesar un email valido'),
    body('password')
        .notEmpty().withMessage('el campo password es obligatorio').bail()
        .isLength({ min: 8, max: 20 }).withMessage('el campo debe contener minimo 8 caracteres maximo 20')

],

validateCreateProduct:[
    body('marca').notEmpty().withMessage('el campo marca es obligatorio'),
    body('modelo')
        .notEmpty().withMessage('el campo modelo es obligatorio'),
    body('anio')
        .notEmpty().withMessage('el campo año es obligatorio').bail(),
    body('descripcion')
        .notEmpty().withMessage('el campo descripcion es obligatorio').bail()
        .isLength({ min: 30, max: 500 }).withMessage('el campo debe contener minimo 100 caracteres maximo 500')
]
}

module.exports = validation;