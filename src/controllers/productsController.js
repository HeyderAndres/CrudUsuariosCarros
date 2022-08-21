const productsModel = require('../models/productsModel');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

const req = require('express/lib/request');

let productsController = {
    allProducts: (req, res) => {
        res.render('products/products', { products: productsModel.getAllProducts() })
    },

    detailProduct: (req, res) => {
        let id = req.params.id;
        res.render('products/productDetail', { product: productsModel.getOneProduct(id) })
    },

    createProduct: (req, res) => {
        res.render('products/create')
    },

    processCreateProduct: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let imagen = "default.png"
            if (req.file) {
                imagen = req.file.filename
            }
            let data = {
                ...req.body,
                imagen: imagen
            }
            productsModel.createProduct(data)
            res.redirect('/products')
        } else {
            let imagen = path.resolve(__dirname, `../public/img/products/${req.file.filename}`)
            fs.existsSync(imagen) ? fs.unlinkSync(imagen) : ''
            res.render('products/create', { errors: errors.mapped(), old: req.body })
        }
    },

    editProduct: (req, res) => {
        let id = req.params.id;
        res.render('products/edit', { product: productsModel.getOneProduct(id) })
    },

    processEditProduct: (req, res) => {
        let id = req.params.id;
        let imagen = '';
        if (req.file == undefined) {
            let product = productsModel.getOneProduct(id)
            imagen = product.imagen
        } else if (productsModel.getOneProduct(id).imagen != "default.png" && productsModel.getOneProduct(id).imagen != null) {
            productsModel.deleteimagen(id)
            imagen = req.file.filename
        } else {
            imagen = req.file.filename
        }
        let data = {
            id: id,
            ...req.body,
            imagen: imagen
        }
        productsModel.updateProduct(id, data)
        res.redirect('/products');
    },

    delete: (req, res) => {
        let id = req.params.id;
        productsModel.deleteImagen(id);
        productsModel.deleteProduct(id)
        res.redirect('/products')
    }

}

module.exports = productsController;