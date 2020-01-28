var CommentController = require('./controller');
const {app} = require('../../server')
const {
    CreateComment,
    FetchCommentByBlogId
} = require("../../constants/routes")
const passport = require('passport')
const {roleAuthorization} = require('../utils/roleAuthorization')


app.post(CreateComment, 
  passport.authenticate('jwt', {session:false}),
  roleAuthorization(['admin']),
  CommentController.createComment
);


// app.get(FetchCommentByBlogId,
//   passport.authenticate('jwt', {session:false}),
//   CommentController.getBlogComments
// )

// app.delete(DeleteBlog,
//   passport.authenticate('jwt', {session:false}),
//   roleAuthorization(['admin']),
//   BlogController.deleteBlog
// )