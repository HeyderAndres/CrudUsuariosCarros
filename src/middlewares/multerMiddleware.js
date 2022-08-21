const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destination = path.resolve(__dirname, '../public/img/avatar');
        cb(null, destination)
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, fileName)
    }
})

const upload = multer({ storage })

module.exports = upload;

