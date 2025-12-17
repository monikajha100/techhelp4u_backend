var express = require('express');
var router = express.Router();
var pool = require('./pool');

/* POST: Check admin login credentials */
router.post('/check_password', function(req, res, next) {
  const { emailid, password } = req.body;

  const query = `
    SELECT * FROM \`admin\`
    WHERE (emailid = ? OR mobileno = ?) AND password = ?
  `;

  pool.query(query, [emailid, emailid, password], function(error, result) {
    if (error) {
      console.log("Database Error:", error);
      return res.status(500).json({
        status: false,
        message: 'Database Error.. Please contact DBA...'
      });
    }

    if (result.length === 1) {
      return res.status(200).json({
        status: true,
        data: result[0],
        message: 'Success'
      });
    } else {
      return res.status(200).json({
        status: false,
        data: [],
        message: 'Invalid Email ID / Mobile No / Password.'
      });
    }
  });
});

module.exports = router;
