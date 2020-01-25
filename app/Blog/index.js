var BlogController = require('./controller');
const {app} = require('../../server')
const {
    CreateBlog,
    FetchAllBlogs,
    DeleteBlog
} = require("../../constants/routes")
const passport = require('passport')
const {roleAuthorization} = require('../utils/roleAuthorization')


app.post(CreateBlog, 
  passport.authenticate('jwt', {session:false}),
  roleAuthorization(['admin']),
  BlogController.createBlog
);

app.get(FetchAllBlogs,
  BlogController.getAllBlogs
)

app.delete(DeleteBlog,
  passport.authenticate('jwt', {session:false}),
  roleAuthorization(['admin']),
  BlogController.deleteBlog
  )