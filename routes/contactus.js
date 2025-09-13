
var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

router.post ('/submit_contact',function(req,res,next){
    try{
        pool.query("insert into contactus (name, email, phone, message, created_at) values (?,?,?,?,?)",[req.body.name, req.body.email, req.body.phone, req.body.message, new Date()]
,function(error,result){
            if(error){
                  return res.status(200).json({ status: false, message: "Database error. Please try again." });
            }
             else {
                res.status(200).json({status:true,message:'details submit succesfully'})
               }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'there are tecnical issue... plscontact server admininstrater'})
    }
 
});
router.get('/display_all_contact',function(req, res, next) {
    try {
        pool.query("select * from contactus",function(error,result){
            if (error){
                
                res.status(200).json({status:false,message:'databse error... pls contact dbs'})
            }
            else {
                     res.status(200).json({status:true,message:'Success',data:result})
            }
        })
    }
    catch(e){ 
        
        res.status(200).json({status:false,message:'there are tecnical issue... plscontact server admininstrater'})
    }
 
});



module.exports = router;