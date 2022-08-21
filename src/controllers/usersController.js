const { validationResult } = require('express-validator')
const userModel = require('../models/userModel');
const bcryptjs = require('bcryptjs')
const fs = require('fs');
const path = require('path')

let usersController = {

    login: (req, res) => {
        res.render('users/login')
    },

    logout:(req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy();
        return res.redirect('/')
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let userInDb = userModel.getUserByField('email', req.body.email)
            if (userInDb) {
                if (bcryptjs.compareSync(req.body.password, userInDb.password)) {
                    delete userInDb.password
                    req.session.userLogged = userInDb;
                    if(req.body.recordarme){
                        res.cookie('userEmail', req.body.email,{maxAge:(1000*60*2)})
                    }
                    return res.redirect('/');
                }
                else {
                return res.render('users/login', {
                    errors: {
                        password: {
                            msg: 'datos incorrectos'
                        }
                    }
                })
            }
            }else {
                return res.render('users/login', {
                    errors: {
                        password: {
                            msg: 'datos incorrectos'
                        }
                    }
                } )
            }
        }
        else {
            res.render('users/login', { errors: errors.mapped(), old: req.body });
        }
    },
    profile:(req,res) =>{
        return res.render('users/profile',{user: req.session.userLogged})
    },

    viewCreate: (req, res) => {
        res.render('users/create')
    },

    users: (req, res) => {
        res.render('users/users', { users: userModel.getAllUser(),userLogged : req.session.userLogged })
    },

    create: (req, res) => {
        res.cookie('')
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let userInDb = userModel.getUserByField('email', req.body.email)
            if (userInDb) {
                let avatar = path.resolve(__dirname, `../public/img/avatar/${req.file.filename}`)
                fs.existsSync(avatar) ? fs.unlinkSync(avatar) : ''
                return res.render('users/create', {
                    errors: {
                        email: {
                            msg: 'el usuario se encuentra registrado'
                        }
                    }, old: req.body

                })
            } else {
                let avatar = "default.png"
                if (req.file) {
                    avatar = req.file.filename
                }
                let data = {
                    ...req.body,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    avatar: avatar,
                }
                userModel.createUser(data)
                res.redirect('/');
            }
        } else {
            res.render('users/create', { errors: errors.mapped(), old: req.body })
        }
    },

    edit: (req, res) => {
        let id = req.params.id;
        let useredit = userModel.getOneUser(id)
        res.render('users/edituser', { useredit })
    },

    update: (req, res) => {
        let id = req.params.id;
        let avatar = '';
        if (req.file == undefined) {
            let user = userModel.getOneUser(id)
            avatar = user.avatar
        } else if (userModel.getOneUser(id).avatar != "default.png") {
            userModel.deleteAvatar(id)
            avatar = req.file.filename
        } else {

            avatar = req.file.filename
        }
        let data = {
            id: id,
            ...req.body,
            avatar: avatar
        }
        userModel.updateUser(id, data)
        res.redirect('/users');
    },

    delete: (req, res) => {
        let id = req.params.id;
        userModel.deleteAvatar(id)
        userModel.deleteUser(id)
        res.redirect('/users');
    }
}

module.exports = usersController;