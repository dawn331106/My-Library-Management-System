var express = require('express');
var router = express.Router();
var db=require('../database');
const imageController= require('../controllers/image-controller');
const { routes } = require('../app');

router.get('/store-image',imageController.imageUploadForm);
router.post('/store-image',imageController.storeImage);

router.get('/form', function(req, res, next) { 
  res.render('book-form-v2'); 
  });
router.get('/search-by-name',(req,res,next)=>{
   res.render('search-book-name');
});
router.get('/search-by-author',(req,res,next)=>{
  res.render('search-book-author');
});
router.get('/search-by-isbn',(req,res,next)=>{
  res.render('search-book-isbn');
});
router.get('/bookissue',(req,res,next)=>{
   res.render('issue-book');
});
router.get('/returnbook',(req,res,next)=>{
  res.render('return-book');
});
router.get('/home',(req,res,next)=>{
  res.render('home-page');
});
router.get('/userhome',(req,res,next)=>{
  res.render('user-home-v2');
});

router.get('/book-list', function(req, res, next) {
    var sql='SELECT * FROM books order by Name';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('book-list-v2', { imageData: data});
  });
});

router.get('/issue-list', function(req, res, next) {
    var sql='SELECT * FROM issued';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('issue-list', { title: 'Issue List', userData: data});
  });
});

router.post('/show-by-name',(req,res,next)=>{
  const userDetails=req.body.Name;
    var sql='select * from books where name=?';
    db.query(sql,userDetails,(err,data)=>{
    if(err) throw err;
    res.render('book-list-v2',{imageData:data})
    });
});
router.post('/book-details',(req,res,next)=>{
  const userDetails=req.body.Name;
    var sql='select * from books where name=?';
    db.query(sql,userDetails,(err,data)=>{
    if(err) throw err;
    res.render('book-details',{userData:data})
    });
});

router.post('/show-by-author',(req,res,next)=>{
  const userDetails=req.body.Author;
    var sql='select * from books where Author=? order by Name';
    db.query(sql,userDetails,(err,data)=>{
    if(err) throw err;
    res.render('book-list-v2',{imageData:data})
    });
});

router.post('/show-by-isbn',(req,res,next)=>{
  const userDetails=req.body.ISBN;
    var sql='select * from books where ISBN=?';
    db.query(sql,userDetails,(err,data)=>{
    if(err) throw err;
    res.render('book-list-v2',{imageData:data})
    });
});

router.post('/issue',(req,res,next)=>{
    const userDetails=req.body.ISBN;
    const reg=req.body.Reg_no;
    const details=req.body;
    var sql2='update books set Quantity=Quantity-1 where ISBN=?';
    var sql1 = 'insert into issued SET ?';
    var sql3 = 'insert into borrowed(reg_no,ISBN)values(?,?)';
    db.query(sql1,details,(err,data)=>{
     if(err) throw err;
    });
    db.query(sql3,[reg,userDetails],(err,data)=>{
      if(err) throw err;
     });
    db.query(sql2,userDetails,(err,data)=> {
    if(err) throw err;
     var sql='select * from books where ISBN=?';
     db.query(sql,userDetails,(err,data)=>{
     if(err) throw err;
     res.render('book-details',{userData:data})
     });
    });
});

router.post('/return',(req,res,next)=>{
  const detail1=req.body.ISBN;
  const detail2=req.body.Reg_no;
  var sql2='update books set Quantity=Quantity+1 where ISBN=?';
  var sql1 = 'delete from issued where ISBN=? and Reg_no=?';
  db.query(sql1,[detail1,detail2],(err,data)=> {
    if(err) throw err;
    db.query(sql2,detail1,(err,data)=>{
      if(err) throw err;
      var sql='SELECT * FROM issued';
      db.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.render('issue-list', { title: 'Issue List', userData: data});
    });
     });
    });
});

router.get('/:isbn',(req,res,next)=>{
   var sql='select * from books where ISBN=?';
   db.query(sql,[req.params.isbn],(err,data)=>{
   if(err) throw err;
   res.render('edit-book',{userData: data});
   });
});

router.post('/auth', function(request, response,next) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				response.redirect('/books/home');
			} else {
				response.redirect('/failed');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

module.exports = router;