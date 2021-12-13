var express = require('express');
var router = express.Router();
var db=require('../../database');

router.post('/:username',(req,res,next)=>{
    var user=req.body.reg_no;
    var sql2='SELECT * FROM users WHERE reg_no = ?'
    var sql3='Select * from books where ISBN in (select ISBN from issued where Reg_no = ?)'
    var sql1='select * from users where username = ?'
    db.query(sql1,[req.params.username],(err,data)=>{
        db.query(sql2,user,(err,results1)=>{
            db.query(sql3,user,(err,results2)=>{
            res.render('user-profile-search',{username: data,userData: results1,bookData: results2});
            });
        });
    });
  });

module.exports = router;