var express = require('express');
var router = express.Router();
var upload=require('./multer')
var pool= require('./pool')

/* GET home page. */
router.post('/submit_team',  upload.single("icon"),function(req, res, next) {
    try {
        pool.query("insert into team (membername, memberrole, memberdescription, img_url,instagram,linkedin) values(?,?,?,?,?,?)",[req.body.membername, req.body.memberrole, req.body.memberdescription,  req.file.filename,req.body.instagram,req.body.linkedin],function(error,result){
            if (error){
                res.status(200).json({status:false,message:'databse error... pls contact dbs'})
            }
            else {
                res.status(200).json({status:true,message:'team  member was added succesfully'})
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'there are tecnical issue... plscontact server admininstrater'})
    }
 
});
router.post('/edit_team', function(req, res, next) {
    try {
        pool.query("update team set membername=?, memberrole=?, memberdescription=?, linkedin=?,instagram=? where teamid=?",[req.body.membername, req.body.memberrole, req.body.memberdescription, req.body.linkedin,req.body.instagram, req.body.teamid],function(error,result){
            if (error){
                res.status(200).json({status:false,message:'databse error... pls contact dbs'})
            }
            else {
                res.status(200).json({status:true,message:'team  member was added succesfully'})
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'there are tecnical issue... plscontact server admininstrater'})
    }
 
});
router.post('/edit_team_picture', upload.single("icon"), function(req, res, next) {
  try {
    console.log("📸 File uploaded:", req.file);
    console.log("🆔 teamid received:", req.body.teamid);

    if (!req.file) {
      return res.status(200).json({ status: false, message: "No file uploaded" });
    }

    pool.query(
      "UPDATE team SET img_url=? WHERE teamid=?",
      [req.file.filename, req.body.teamid],
      function(error, result) {
        if (error) {
         
          res.status(200).json({ status: false, message: 'Database error... please contact DB admin' });
        } else {
          res.status(200).json({ status: true, message: 'Icon updated successfully' });
        }
      }
    );
  } catch (e) {
    
    res.status(200).json({ status: false, message: 'Technical issue... contact server admin' });
  }
});

router.post('/delete_team', function(req, res, next) {
    try {
        pool.query("delete from team where  teamid=?",[req.body.teamid],function(error,result){
            if (error){
                res.status(200).json({status:false,message:'databse error... pls contact dbs'})
            }
            else {
                res.status(200).json({status:true,message:'team  member waa deleted  succesfully'})
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'there are tecnical issue... plscontact server admininstrater'})
    }
 
});
router.get('/display_all_team',function(req, res, next) {
    try {
        pool.query("select * from team",function(error,result){
            if (error){
               
                res.status(200).json({status:false,message:'databse error... pls contact dbs'})
            }
            else {
                     res.status(200).json({status:true,message:'Success',data:result})
            }
        })
    }
    catch(e){ 
        console.log(e)
        res.status(200).json({status:false,message:'there are tecnical issue... plscontact server admininstrater'})
    }
 
});


module.exports = router;
