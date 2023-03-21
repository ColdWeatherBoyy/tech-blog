const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models/index");

// homepage route with existing blogposts
router.get("/", async (req, res) => {
	try {
		const blogData = await BlogPost.findAll({
			attributes: ["title", "post", "created_at"],
			include: [
				{
					model: User,
					attributes: ["name"],
				},
			],
			order: [["created_at", "DESC"]],
		});

		const blogs = blogData.map((blog) => blog.get({ plain: true }));
		res.render("homepage", { blogs, loggedIn: req.session.loggedIn });
	} catch (err) {
		res.status(500).json(err);
	}
});

// router.get("*", async (req, res) => {});

// route for login page
router.get("/login", (req, res) => {
	try {
		return res.render("login");
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
