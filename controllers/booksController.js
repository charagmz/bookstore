var dbconn = require("../config/connection");
var book = require("../model/book");
var delfile = require("fs");

module.exports = {

    index:function(req, res) {
        book.get(dbconn, function (rows) {
            //console.log(rows);
            res.render('books/index', { title: 'Aplicacion', books: rows });
        })
    },
    create:function(req, res) {
        res.render('books/create');
    },
    save:function(req, res) {
        console.log(req.body);
        console.log(req.file.filename);
        book.insert(dbconn, req.body, req.file, function (rows) {
            res.redirect('/books');
        })
        //res.send(req.body);
    },
    delete: function(req, res) {
        //console.log(req.params.id);
        book.getById(dbconn, req.params.id, function (rbook) {
            //console.log(rbook);
            var imageName = "public/images/"+rbook.image;
            if (delfile.existsSync(imageName)) {
                delfile.unlinkSync(imageName);
            }
            book.delete(dbconn, req.params.id, function (dbres) {
                res.redirect('/books');
            })
        })
    },
    edit:function(req, res) {
        book.getById(dbconn, req.params.id, function (rbook) {
            res.render('books/edit', { book: rbook});
        })
    },
    update:function(req, res) {
        console.log(req.body.name)
        
        if (req.file) {
            if (req.file.filename) {
                book.getById(dbconn, req.body.id, function (rbook) {
                    console.log(rbook);
                    var imageName = "public/images/"+rbook.image;
                    if (delfile.existsSync(imageName)) {
                        delfile.unlinkSync(imageName);
                    }
                    book.updateImg(dbconn, req.body, req.file, function (dbres) {
                    })
                })      
            }
        }
        if (req.body.name) {
            book.update(dbconn, req.body, function(dbres) {

            })
        }
        res.redirect('/books')
    },

}