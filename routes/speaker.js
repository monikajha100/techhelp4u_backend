var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

router.post("/submit", upload.single("icon"), function (req, res, next) {
  try {
    // agar id AUTO_INCREMENT hai to query me id mat do
    pool.query(
      "INSERT INTO speaker (workshopid, speakername, speakerrole, linkedin, icon, time, session, venue, speakercol) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        req.body.workshopid,
        req.body.speakername,
        req.body.speakerrole,
        req.body.linkedin,
        req.file ? req.file.filename : null,
        req.body.time,
        req.body.session,
        req.body.venue,
        req.body.speakercol || ""   // agar tumhe frontend se nahi bhejna to default empty string
      ],
      function (error, result) {
        if (error) {
          console.error("DB Error:", error); // Debugging ke liye
          return res
            .status(200)
            .json({ status: false, message: "Database error. Please try again." });
        } else {
          res
            .status(200)
            .json({ status: true, message: "Details submitted successfully" });
        }
      }
    );
  } catch (e) {
    console.error("Catch Error:", e);
    res.status(200).json({
      status: false,
      message: "There is a technical issue... please contact server administrator",
    });
  }
});

router.get('/display_all_speaker',function(req, res, next) {
    try {
        pool.query("select * from speaker",function(error,result){
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
router.post('/edit_speaker', function(req, res, next) {
    try {
        pool.query("update speaker set speakername=?, speakerrole=?,linkedin=?,time=?,session=?,venue=? where id=?",[req.body.speakername, req.body.speakerrole, req.body.linkedin,req.body.time,req.body.session,req.body.venue, req.body.id],function(error,result){
            if (error){
                res.status(200).json({status:false,message:'databse error... pls contact dbs'})
            }
            else {
                res.status(200).json({status:true,message:'team  member was added succesfully'})
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'there are technical issue... plscontact server admininstrater'})
    }
 
});
router.post('/edit_speaker_picture', upload.single("icon"), function(req, res, next) {
  try {
    console.log("📸 File uploaded:", req.file);
    console.log("🆔 teamid received:", req.body.teamid);

    if (!req.file) {
      return res.status(200).json({ status: false, message: "No file uploaded" });
    }

    pool.query(
      "UPDATE speaker SET icon=? WHERE id=?",
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
router.post('/delete_speaker', function(req, res, next) {
    try {
        pool.query("delete from speaker where  id=?",[req.body.id],function(error,result){
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