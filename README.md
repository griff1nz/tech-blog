# Tech Blog
[Link to application](https://hbs-tech-blog-59b7f5e6f9b6.herokuapp.com/)

## Description
This is a blog website built with Handlebars.js as the MVC, Sequelize as the ORM, and express-session for authentication. Users can create, edit, and delete posts, as well as read posts made by other users.

![Screenshot of Program](<./public/images/mvc-blog.png>)

## Installation
N/A

## Usage
Upon loading into the app, the user must click the login button in the header to log in. If they do not yet have an account, they must create one by clicking the sign up button. Upon logging in, the user can create a new post, or click on an existing post and add a comment. The user can click on the dashboard button in the header at any time to view, edit, or delete their own posts. When finished browsing the website, the user can either log out manually, or let the session time out after an hour.

## Credits 
How to change location on button click: https://stackoverflow.com/questions/16562577/how-can-i-make-a-button-redirect-my-page-to-another-page

## License
Please refer to the LICENSE in the repo.

## Source Code Locations
server.js: ./server.js   
package.json: ./package.json   
All .handlebars files: ./views/*   
output.css and style.css: ./public/css/*   
All .js files: ./public/js/*   
All models: ./models/*   
Route controllers: ./controllers/*