const sequelize = require("../config/connection");
const { User, BlogPost } = require("../models");

// import seed data
const userData = require("./userData.json");
const blogData = require("./blogData.json");

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});

	await BlogPost.bulkCreate(blogData, {
		individualHooks: true,
		returning: true,
	});

	process.exit(0);
};

seedDatabase();
