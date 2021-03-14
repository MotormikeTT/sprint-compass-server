const express = require("express");
const router = express.Router();
const setup = require("./setupalerts");

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await setup.setupAlerts());
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("setup failed - internal server error");
  }
});

module.exports = router;
