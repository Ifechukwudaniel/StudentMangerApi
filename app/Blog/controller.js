const Blog= require("./model")
const {missingParameterError, missingImageError}  = require("../utils/error")

const  createBlog= (req,res, next)=>{
   const {
     image, 
     content
   } = req.body

  if(!content) return res.status(500).send(missingParameterError("department"))

  if(!image) return res.status(500).send(missingImageError())
  
  const blog = new Blog({
      image,
      content
  })
  blog.save()
  .then(()=>{
      return res.send({success:" saved the new blog post"})
  })
  .catch(()=>{
    return res.send({error:"could not create a  new blog post "})
  })
}

getAllBlogs = (req, res, next )=>{
    Blog.find({})
    .populate("comments")
    .limit(10)
    .then(data=>{
      return res.send(data.reverse())
    })
}

deleteBlog = (req, res, next )=>{
    const {blogId} = req.params
    Blog.findByIdAndDelete(blogId)
    .then(()=>{
       return res.send({message:"Blog delete successful"})
    })
    .catch(()=>{
      return res.send({error:"Blog  could not be deleted"})
    })
}
module.exports = {
   createBlog,
   getAllBlogs,
   deleteBlog
};