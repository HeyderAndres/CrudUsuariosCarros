let fs = require('fs');
let path = require('path');
let userModel = {
    filename: path.join(__dirname, '../db/userDb.json'),

    getAllUser: function () {
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'))
    },

    getOneUser: function (id) {
        let user = this.getAllUser().find(user => user.id == id);
        return user;
    },

    getUserByField: function (field, data) {
        let user = this.getAllUser().find(user => user[field] == data);
        return user;
    },

    createUser: function (data) {
        let newId = 0
        let users = this.getAllUser()
        if (users.length <= 0) {
            newId = 1;
        } else {
            let usersId = users.map(user => user.id);
            let maxId = Math.max(...usersId);
            newId = maxId + 1
        }
        data = {
            id: newId,
            ...data
        }
        users.push(data);
        const usersJson = JSON.stringify(users, null, ' ');
        fs.writeFileSync(this.filename, usersJson);
        return data;
    },

    deleteUser: function (id) {
        let users = this.getAllUser().filter(user => user.id != id)
        const usersJson = JSON.stringify(users, null, ' ');
        fs.writeFileSync(this.filename, usersJson);
    },

    deleteAvatar: function (id) {
        let user = this.getOneUser(id)
        let avatar = path.resolve(__dirname, `../public/img/avatar/${user.avatar}`)
        fs.existsSync(avatar) ? fs.unlinkSync(avatar) : ''
    },

    updateUser: function (id, data) {
        let userUpdate = this.getAllUser()
        let index = this.getAllUser().findIndex(user => user.id == id)
        userUpdate[index] = data
        const usersJson = JSON.stringify(userUpdate, null, ' ');
        fs.writeFileSync(this.filename, usersJson);
    }


}

userModel.getUserByField('email',"prueba@prueba.com")

module.exports = userModel;