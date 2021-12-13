var express = require('express');
var router = express.Router();
var db=require('../../database');

router.post('/:username',(req,res,next)=>{
    const userDetails=req.body.Name;
      var sql='select * from books where name=?';
      db.query(sql,userDetails,(err,results)=>{
      if(err) throw err;
      sql='SELECT * FROM users WHERE username = ?'
      db.query(sql,[req.params.username],(err,data)=>{
      res.render('user-book-details',{username: data,userData: results});
      });
    });
});

module.exports = router;