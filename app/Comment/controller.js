const Comment= require("./model")
const Blog = require('../Blog/model')
const User = require('../User/model')
const {missingParameterError, missingImageError}  = require("../utils/error")

const  createComment= (req,res, next)=>{
   const {
     blogId,
     content,
     userId
   } = req.body

  if(!content) return res.status(500).send(missingParameterError("content"))

  if(!userId) return res.status(500).send(missingParameterError("User"))

  if(!blogId) return res.status(500).send(missingParameterError("blog"))

  User.findById(userId)
  .then((user)=>{
      Blog.findById(blogId)
      .then(blog=>{
        const  comment = new Comment({
          user:user._id,
          blog:blog._id,
          content
        })
        comment.save()
        .then((data)=>{
          Blog
          .findByIdAndUpdate(blog._id, 
            { $push:{comments:data._id}
            }).exec()
            .then(()=>{
               return res.send({message:`You just added a comment`})
            })
        })
      })
      .catch(()=>{
        return res.send({error:"blog  not found"})
      })
  })
  .catch((e)=>{
      return res.send({error:"user not found"})
  })

}

getBlogComments = (req, res, next )=>{
    Comment.find({})
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
   createComment,
  getBlogComments,
  
};