var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

router.post('/submit_event',upload.single("icon"),function(req,res,next){

try {
        pool.query("insert into workshops (eventname, date, time, type, icon, eventdescription, location, status, created_at) values(?,?,?,?,?,?,?,?,?)",
          [req.body. eventname,  
            req.body.date, 
            req.body.time,
              req.file.filename,
              req.body.type,
               req.body.location,
                req.body. status,
              req.body.eventdescription],function(error,result){
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
      

// GET test route to check DB connection


router.get('/display_all_event', function(req, res, next) {
    try {
        
        pool.query("select * from workshops",function(error,result){
            if (error){
                res.status(200).json({status:false,message:'database error... pls contact dbs'})
            }
            else {
                     res.status(200).json({status:true,message:'Success',data:result})
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'There are technical issues... please contact server administrator'})
    }
});
router.post('/edit_event', function(req, res, next) {
    try {
       pool.query(
  "UPDATE workshops SET eventname=?, eventdescription=?, date=?, time=?, type=?, location=? ,status=? WHERE workshopid=?",
  [
    req.body.eventname,
    req.body.eventdescription,
    req.body.date,
    req.body.time,
    req.body.type,
    req.body.location,
    req.body.status,
    req.body.workshopid
  ],
  function (error, result) {
    if (error) {
      console.error("MySQL Error:", error);  // Log exact error
      res.status(200).json({ status: false, message: "Database error... please contact DBS" });
    } else if (result.affectedRows === 0) {
      res.status(200).json({ status: false, message: "No matching event ID. Update failed." });
    } else {
      res.status(200).json({ status: true, message: "Updated successfully" });
    }
  }
);

    }
    catch(e){
        res.status(200).json({status:false,message:'there are tecnical issue... plscontact server admininstrater'})
    }
 
});

router.post('/edit_event_picture', upload.single("icon"), function(req, res, next) {
  try {
    console.log("📸 File uploaded:", req.file);
    console.log("🆔 eventid received:", req.body.eventid);

    if (!req.file) {
      return res.status(200).json({ status: false, message: "No file uploaded" });
    }

    pool.query(
      "UPDATE workshops SET icon=? WHERE workshopid=?",
      [req.file.filename, req.body.id],
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
router.post('/delete_event', function(req, res, next) {
    try {
        pool.query("delete from workshops where  workshopid=?",[req.body.workshopid],function(error,result){
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
module.exports = router;
