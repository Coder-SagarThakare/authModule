const logger = require("../config/logger");

const router = require("express").Router();

router.get('/',(req,res)=>{
    logger('hiii in auth /')
})
module.exports = router;
