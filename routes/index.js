

var express = require("express");
var router = express.Router();

router.use("/users", require("../lib/routes/users"));


module.exports = router;