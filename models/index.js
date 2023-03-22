const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

module.exports = { User, BlogPost, Comment };

// user/blogpost one to many associations
User.hasMany(BlogPost, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
	foreignKey: "user_id",
});

// user/comment one to many associations
User.hasMany(Comment, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

Comment.belongsTo(User, {
	foreignKey: "user_id",
});

// comment/blogpost one to many association
BlogPost.hasMany(Comment, {
	foreignKey: "blogpost_id",
	onDelete: "CASCADE",
});

Comment.belongsTo(BlogPost, {
	foreignKey: "blogpost_id",
});

// exports
module.exports = { User, BlogPost, Comment };
