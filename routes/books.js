var express = require('express');
var router = express.Router();
const booksController = require("../controllers/booksController");

var multer = require('multer');
var dateNow = Date.now();
var routeFiles = multer.diskStorage(
    {
        destination: function(request, file, callback) {
            callback(null, './public/images');
        },
        filename: function (request, file, callback) {
            console.log(file)
            callback(null, dateNow+"_"+file.originalname);
        }
    }
);
var loadFile = multer({storage: routeFiles});

/* GET home page. */
router.get('/', booksController.index);
router.get('/create', booksController.create);
router.post('/', loadFile.single("image"), booksController.save);
router.post('/delete/:id', booksController.delete);
router.get('/edit/:id', booksController.edit);
router.post('/update', loadFile.single("image"), booksController.update);

module.exports = router;