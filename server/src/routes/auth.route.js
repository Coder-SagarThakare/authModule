const logger = require("../config/logger");
const captcha = require("../middlewares/captcha");

const router = require("express").Router();

router.get('/',(req,res)=>{
    res.send('hiii in auth /')

})

router.route('/register',[captcha.verify],)
module.exports = router;
