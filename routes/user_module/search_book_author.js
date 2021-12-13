var express = require('express');
var router = express.Router();
var db=require('../../database');

router.post('/:username',(req,res,next)=>{
    const userDetails=req.body.Author;
    var sql='SELECT * FROM users WHERE username = ?'
    db.query(sql,[req.params.username],(err,results)=>{
     sql='select * from books where Author=? order by Name';
      db.query(sql,userDetails,(err,data)=>{
      if(err) throw err;
      res.render('user-book-list',{imageData:data,username: results})
      });
    });
  });


module.exports = router;