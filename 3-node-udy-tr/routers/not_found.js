const express = require("express");

const router = express.Router();

router.use((req, res)=> {
  res.send("Dont found a route");
});

module.exports = router;