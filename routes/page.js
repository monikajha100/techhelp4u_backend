
var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

router.post('/save',  upload.single("icon"),function(req, res, next) {

    try {
          pool.query("insert into page( page_name, section_name, title, description, image_url, link)values(?,?,?,?,?,?)", [req.body.page_name, req.body.section_name, req.body.title, req.body.description, req.file.filename, req.body.link],function(error,result){

    if (error){
                res.status(200).json({status:false,message:'databse error... pls contact dbs'})
            }
            else {
                res.status(200).json({status:true,message:'save  member was added succesfully'})
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'there are tecnical issue... plscontact server admininstrater'})
    }
});
module.exports = router;