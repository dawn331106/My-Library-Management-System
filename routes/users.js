var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/form', function(req, res, next) { 
  res.render('book-form'); 
  });
router.get('/search',(req,res,next)=>{
   res.render('search-book');
});
router.get('/bookissue',(req,res,next)=>{
   res.render('issue-book');
});
router.get('/book-list', function(req, res, next) {
    var sql='SELECT * FROM books';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('book-list', { title: 'Book List', userData: data});
  });
});

router.post('/create', function(req, res, next) {
  const userDetails=req.body;
  var sql = 'insert into books SET ?';
  db.query(sql, userDetails,function (err, data) { 
      if (err) throw err;
     res.redirect('/books/book-list');
    console.log("Successfylly inserted"); 
  });
}); 

router.post('/show',(req,res,next)=>{
  const userDetails=req.body.Name;
    var sql='select * from books where name=?';
    db.query(sql,userDetails,(err,data)=>{
    if(err) throw err;
    res.render('book-list',{title: 'Book List',userData:data})
    });
});

router.post('/issue',(req,res,next)=>{
    const userDetails=req.body.id;
    var sql='update books set Quantity=Quantity-1 where BooksID=?';
    db.query(sql,userDetails,(err,data)=> {
    if(err) throw err;
    res.redirect('/books/book-list');
    });
});

router.post('/update/:id',(req,res,next)=>{
   var sql='update books set ? where BooksID=?';
   db.query(sql,[req.body,req.params.id],(err,data)=>{
     if(err) throw err;
     console.log('successfully updated');
   });
   res.redirect('/books/book-list');
});

router.get('/edit/:id',(req,res,next)=>{
   var sql='select * from books where BooksID=?';
   db.query(sql,[req.params.id],(err,data)=>{
   if(err) throw err;
   res.render('edit-book',{title: 'Edit Book',userData: data});
   });
});

router.get('/delete/:id',(req,res,next)=>{
   var sql='delete from books where BooksID=?';
   db.query(sql,[req.params.id],(err,data)=>{
   if(err) throw err;
  console.log("Deleted successfully");
   });
   res.redirect('/books/book-list');
});

module.exports = router;