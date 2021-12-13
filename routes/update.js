var express = require('express');
var router = express.Router();
var db=require('../database');

router.post('/:isbn',(req,res,next)=>{
    var sql='update books set ? where ISBN=?';
    db.query(sql,[req.body,req.params.isbn],(err,data)=>{
      if(err) throw err;
      console.log('successfully updated!');
     const userDetails=req.body.Name;
     sql='select * from books where name=?';
     db.query(sql,userDetails,(err,data)=>{
     if(err) throw err;
     res.render('book-details',{userData:data})
     });
    });
 });

 module.exports = router;