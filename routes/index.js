var express = require('express');
var router = express.Router();
var db=require('../database');
const imageController= require('../controllers/image-controller');

router.get('/', function(req, res, next) {
  res.render('login-option');
});
router.get('/failed',(req,res,next)=>{
  res.render('login-failed');
});
router.get('/userfailed',(req,res,next)=>{
  res.render('user-login-failed');
});
router.get('/admin',(req,res,next)=>{
  res.render('admin-login');
});
router.get('/user',(req,res,next)=>{
  res.render('user-login');
});
router.get('/register',(req,res,next)=>{
  res.render('user-registration');
});

router.post('/userauth', function(request, response,next) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				response.render('user-home-page',{username: results});
			} else {
				response.redirect('/userfailed');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

router.post('/adduser',(req,res,next)=>{
  const details=req.body;
  var sql = 'insert into users SET ?';
  db.query(sql,details,(err,data)=>{
   if(err) throw err;
   res.render('user-login')
  });
});


module.exports = router;
