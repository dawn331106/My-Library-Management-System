var multer  = require('multer');
var imageMiddleware= require('../middlewares/image-middleware');
var db=require('../database');
var imageModel= require('../models/image-model');

module.exports={
    imageUploadForm:function(req,res){
        res.render('book-form-v2');
     },
     storeImage:function(req,res){
        var upload = multer({
                    storage: imageMiddleware.image.storage(), 
                    allowedImage:imageMiddleware.image.allowedImage 
                    }).single('image');
        upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
              res.send(err);
           } else if (err) {
              res.send(err);
           }else{
              // store image in database
               var imageName = req.file.originalname;
               var bookName=req.body.Name;
               var isbn=req.body.ISBN;
               var author=req.body.Author;
               var published=req.body.Published;
               var page=req.body.Pages;
               var quantity=req.body.Quantity;
               var inputValues = {
                  ISBN: isbn,
                  Name: bookName,
                  Author: author,
                  image_name: imageName,
                  Published: published,
                  Pages: page,
                  Quantity: quantity
              }
             // call model
             imageModel.storeImage(inputValues, function(data){
               //res.render('book-list-v2',{imageData:data})
               var sql='SELECT * FROM books order by Name';
               db.query(sql, function (err, data, fields) {
               if (err) throw err;
               res.render('book-list-v2', { imageData: data});
             });
             })
              
           }
           
        })
        
     }
}