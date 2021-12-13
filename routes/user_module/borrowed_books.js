var express = require('express');
var router = express.Router();
var db=require('../../database');

router.get('/:reg_no', function(req, res, next) {
    var sql='SELECT * FROM books where ISBN in (select ISBN from borrowed where reg_no = ?)';
    db.query(sql,[req.params.reg_no],(err, results) =>{
    if (err) throw err;
    sql='SELECT * FROM users WHERE reg_no = ?'
    db.query(sql,[req.params.reg_no],(err,data)=>{
    res.render('user-book-list',{username: data,imageData: results});
    });
  });
});

module.exports = router;