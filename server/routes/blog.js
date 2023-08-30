const express = require("express")
const router = express.Router()
const {create,getAllblogs,singleBlog,remove,update} =require("../controller/blogController")
const {requireLogin} =require("../controller/authController")


router.post('/create',requireLogin,create)
// การใช้งาน 
router.get('/blogs',getAllblogs)
router.get('/blog/:slug',singleBlog)

router.delete('/blog/:slug',requireLogin,remove)
router.put('/blog/:slug',requireLogin,update)
module.exports=router