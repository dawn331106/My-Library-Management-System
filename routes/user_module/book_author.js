var express = require('express');
var router = express.Router();
var db=require('../../database');

router.get('/:username',(req,res,next)=>{
    var sql='SELECT * FROM users WHERE username = ?'
    db.query(sql,[req.params.username],(err,data)=>{
    res.render('user-search-book-author',{username: data});
    });
  });

module.exports = router;