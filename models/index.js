const BlogPost = require('./BlogPost');
const Comment = require('./Comment');
const User = require('./User');

BlogPost.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'post_id',
});

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { BlogPost, Comment, User };