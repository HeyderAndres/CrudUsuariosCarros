let fs = require('fs');
let path = require('path');
let productsModel = {
    filename: path.join(__dirname, '../db/productsDb.json'),

    getAllProducts: function () {
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'))
    },

    getOneProduct: function (id) {
        let product = this.getAllProducts().find(product => product.id == id);
        return product;
    },

    getProductByField: function (field, data) {
        let product = this.getAllProducts().filter(product => product[field] == data);
        return product;
    },

    createProduct: function (data) {
        let newId = 0
        let products = this.getAllProducts()
        if (products.length <= 0) {
            newId = 1;
        } else {
            let productsId = products.map(product => product.id);
            let maxId = Math.max(...productsId);
            newId = maxId + 1
        }
        data = {
            id: newId,
            ...data
        }
        products.push(data);
        const productsJson = JSON.stringify(products, null, ' ');
        fs.writeFileSync(this.filename, productsJson);
        return data;
    },

    deleteProduct: function (id) {
        let products = this.getAllProducts().filter(product => product.id != id)
        const productsJson = JSON.stringify(products, null, ' ');
        fs.writeFileSync(this.filename, productsJson);
    },

    deleteImagen: function (id) {
        let product = this.getOneProduct(id)
        let imagen = path.resolve(__dirname, `../public/img/products/${product.imagen}`)
        fs.existsSync(imagen) ? fs.unlinkSync(imagen) : ''
    },

    updateProduct: function (id, data) {
        let productUpdate = this.getAllProducts()
        let index = this.getAllProducts().findIndex(product => product.id == id)
        productUpdate[index] = data
        const productsJson = JSON.stringify(productUpdate, null, ' ');
        fs.writeFileSync(this.filename, productsJson);
    }


}

module.exports = productsModel;