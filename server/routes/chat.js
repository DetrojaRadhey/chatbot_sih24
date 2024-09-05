const router = require("express").Router();
const { generateanswer } = require("../controller/chat");

router.post("/getanswer", generateanswer);


module.exports = router;