var express = require('express');
var router = express.Router();
var pool = require('./pool');

// Submit sponsor
router.post('/submit', function(req, res) {
  try {
    pool.query(
      "INSERT INTO sponsors (type, company_name, url, contact, title, email, name, created_at) VALUES (?,?,?,?,?,?,?,?)",
      [
        req.body.type,
        req.body.company_name,
        req.body.url,
        req.body.contact,
        req.body.title,
        req.body.email,  // ✅ email before name
        req.body.name,
        new Date()       // ✅ server sets created_at
      ],
      function(error, result) {
        if (error) {
          console.error("DB Error:", error);
          return res.status(200).json({
            status: false,
            message: "Database error. Please try again."
          });
        } else {
          res.status(200).json({
            status: true,
            message: "Details submitted successfully"
          });
        }
      }
    );
  } catch (e) {
    console.error("Catch Error:", e);
    res.status(200).json({
      status: false,
      message: "There is a technical issue... Please contact the server administrator."
    });
  }
});

router.get('/display_all',function(req, res, next) {
    try {
        pool.query("select * from sponsors",function(error,result){
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