//ติดต่อกับฐานข้อมูล
const slugify = require("slugify")
const Blogs = require("../blog/blogs")
const { v4: uuidv4 } = require('uuid');

//บันทึกข้อมูล

exports.create=(req,res)=>{
    const {title,content,author}=req.body
    let slug = slugify(title)
    if(!slug)slug=uuidv4();

    //validate /ตรวจสอบความถูกต้องของข้อมูล
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่องาน"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหางาน"})
            break;
    }
    
    //บันทึกข้อมุล
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"มีชื่องานความซ้ำกัน"})
        }
        res.json(blog)
    })


}

    //ดึงข้อมูลบทความทั้งหมด
exports.getAllblogs=(req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}

//ดึงบทความที่สนใจ ตาม slug
exports.singleBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}

exports.remove=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message:"ลบงานเรียบร้อยแล้ว"
        })
    })

}

exports.update=(req,res)=>{
    const {slug} = req.params
    //*  ส่งข้อมุล => title , content, author
    const {title,content,author}=req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog)
    })
    
}
