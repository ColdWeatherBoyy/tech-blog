const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models/index");
const withAuth = require("../utils/auth");

// homepage route with existing blogposts
router.get("/", withAuth, async (req, res) => {
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

router.get("/dashboard", withAuth, (req, res) => {
	try {
		res.render("dashboard", { loggedIn: req.session.loggedIn });
	} catch (err) {
		res.status(500).json(err);
	}
});

// route for login page
router.get("/login", (req, res) => {
	try {
		return res.render("login");
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
