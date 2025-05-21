const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'profile-pics');
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
};

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);    
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({storage});
module.exports = upload;