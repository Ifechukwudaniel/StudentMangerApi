const Blog= require("./model")
const {missingParameterError, missingImageError}  = require("../utils/error")
const { LikeBlogPost } = require("../../constants/routes")
const _ = require('lodash')

const  createBlog= (req,res, next)=>{
   const {
     image, 
     content,
     title,
     tag
   } = req.body

  if(!content) return res.status(500).send(missingParameterError("content"))
  if(!title) return res.status(500).send(missingParameterError("title"))
  if(!tag) return res.status(500).send(missingParameterError("tag"))

  if(!image) return res.status(500).send(missingImageError())
  
  const blog = new Blog({
      image,
      content,
      title,
      tag
  })
  blog.save()
  .then(()=>{
      return res.send({success:" saved the new blog post"})
  })
  .catch(()=>{
    return res.send({error:"could not create a  new blog post "})
  })
}

 const getAllBlogs = (req, res, next )=>{
    Blog.find({})
    .populate({path:"comments",select:"time content user"})
    .limit(10)
    .then(data=>{
      return res.send(data.reverse())
    })
}

const deleteBlog = (req, res, next )=>{
    const {blogId} = req.params
    Blog.findByIdAndDelete(blogId)
    .then(()=>{
       return res.send({message:"Blog delete successful"})
    })
    .catch(()=>{
      return res.send({error:"Blog  could not be deleted"})
    })
}


const  likeBlogPost = (req, res,next)=>{
   const {blog}  = req.params
   Blog.findById(blog)
   .then(data=>{
     if(data.likedBy.includes(req.user.id)){
      return res.send({message:"Blog was already liked by you"})
     }
     else{
      Blog.update({"_id":data.id,},{
        $push:{likedBy:req.user.id}
      })
      .then(()=>{
       return res.send({message:"Like BLog"})
      })
     }
   })
   .catch(err=>{
    return res.send({error:"The Blog was not found"})
   })
 }

 const unLikeBlogPost = (userId)=>{

 }

 const unDisLikeBlogPost = (userId)=>{

}

 const  dislikeBlogPost = (req, res,next)=>{
  const {blog}  = req.params
  Blog.findById(blog)
  .then(data=>{
    console.log(data)
    if(data.disLikedBy.includes(req.user.id)){
     return res.send({message:"Blog was already disliked by you"})
    }
    else{
     Blog.update({"_id":data.id,},{
       $push:{disLikedBy:req.user.id}
     })
     .then(()=>{
      return res.send({message:"Dislike BLog"})
     })
    }
  })
  .catch(err=>{
    console.log(err)
   return res.send({error:"The Blog was not found"})
  })
}

module.exports = {
   createBlog,
   getAllBlogs,
   deleteBlog,
   likeBlogPost,
   dislikeBlogPost
};