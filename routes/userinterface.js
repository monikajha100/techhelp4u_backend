var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

/* GET home page. */
router.post('/display_all_workshops_by_type', function (req, res) {
  try {
    console.log("📥 Request Body:", req.body);

    pool.query(
      "SELECT * FROM workshops WHERE type = ?",
      [req.body.type],
      function (error, result) {
        if (error) {
          console.log("❌ DB Error:", error);
          return res.status(200).json({
            message: "Database Error. Please contact backend team.",
            status: false
          });
        } else {
          return res.status(200).json({
            message: "Workshops fetched successfully",
            data: result,
            status: true
          });
        }
      }
    );
  } catch (e) {
    console.log("❌ Server Error:", e);
    return res.status(200).json({
      message: "Severe server error. Please contact backend team.",
      status: false
    });
  }
});
router.get('/display_all_team', function (req, res, next) {
  try {

    pool.query("select * from team", function (error, result) {
      if (error) {
        res.status(200).json({ status: false, message: 'database error... pls contact dbs' })
      }
      else {
        res.status(200).json({ status: true, message: 'Success', data: result })
      }
    })
  }
  catch (e) {
    res.status(200).json({ status: false, message: 'There are technical issues... please contact server administrator' })
  }
});
router.get('/display_all_event', function (req, res, next) {
  try {

    pool.query("select * from workshops", function (error, result) {
      if (error) {
        res.status(200).json({ status: false, message: 'database error... pls contact dbs' })
      }
      else {
        res.status(200).json({ status: true, message: 'Success', data: result })
      }
    })
  }
  catch (e) {
    res.status(200).json({ status: false, message: 'There are technical issues... please contact server administrator' })
  }
});
// server/routes/speaker.js
router.get('/display_speaker_by_workshop/:id', function(req, res, next) {
    try {
        const workshopid = req.params.id;
        pool.query(
            "SELECT * FROM speaker WHERE workshopid = ?",
            [workshopid],
            function(error, result) {
                if (error) {
                    console.log("DB Error:", error);
                    res.status(500).json({ status: false, message: "Database error" });
                } else {
                    res.status(200).json({ status: true, data: result });
                }
            }
        );
    } catch (e) {
        res.status(500).json({ status: false, message: "Server error" });
    }
});

router.get('/display_event_by_id/:id', (req, res) => {
  pool.query("SELECT * FROM workshops WHERE workshopid=?", [req.params.id], (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      res.status(500).json({ status: false, message: "Database error" });
    } else {
      if (result.length > 0) {
        res.json({ status: true, data: result[0] });
      } else {
        res.status(404).json({ status: false, message: "Event not found" });
      }
    }
  });
});




    module.exports = router;
