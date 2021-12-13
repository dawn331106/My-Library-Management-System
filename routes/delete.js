var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/:isbn',(req,res,next)=>{
    var sql='delete from books where ISBN=?';
    db.query(sql,[req.params.isbn],(err,data)=>{
    if(err) throw err;
    console.log("Deleted successfully");
    sql='SELECT * FROM books order by Name';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('book-list-v2', { imageData: data});
    });
    });
 });

 module.exports = router;