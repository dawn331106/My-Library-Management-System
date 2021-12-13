var express = require('express');
var router = express.Router();
var db=require('../../database');

router.get('/:username',(req,res,next)=>{
    var sql='SELECT * FROM users WHERE username = ?'
    var sql1='Select * from books where ISBN in (select ISBN from issued where Reg_no in (select Reg_no from users where username = ?))'
    db.query(sql,[req.params.username],(err,data)=>{
        db.query(sql1,[req.params.username],(err,results)=>{
            res.render('user-profile',{username: data,userData: data,bookData: results});
        });
    });
  });

module.exports = router;