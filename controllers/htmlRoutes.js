const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models/index");
const withAuth = require("../utils/auth");

// homepage route with existing blogposts
router.get("/", withAuth, async (req, res) => {
	try {
		const blogData = await BlogPost.findAll({
			attributes: ["title", "post", "created_at", "id"],
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

router.get("/dashboard", withAuth, async (req, res) => {
	try {
		const userBlogData = await BlogPost.findAll({
			where: { user_id: req.session.user_id },
			attributes: ["title", "post", "created_at", "id"],
			include: [
				{
					model: User,
					attributes: ["name", "id"],
				},
			],
			order: [["created_at", "DESC"]],
		});

		const blogs = userBlogData.map((blog) => blog.get({ plain: true }));

		res.render("dashboard", { blogs, loggedIn: req.session.loggedIn });
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

// route for creating blogposts
router.get("/blogposts/create", withAuth, async (req, res) => {
	try {
		res.render("blogpostcreate", { loggedIn: req.session.loggedIn });
	} catch (err) {
		res.status(500).json(err);
	}
});

// route for individual blogpost
router.get("/blogposts/:id", withAuth, async (req, res) => {
	try {
		const blogId = req.params.id;
		const blogData = await BlogPost.findByPk(blogId, {
			attributes: ["title", "post", "created_at", "id", "user_id"],
			include: [
				{
					model: User,
					attributes: ["name"],
				},
				{
					model: Comment,
					attributes: ["text", "created_at"],
					include: {
						model: User,
						attributes: ["name"],
					},
				},
			],
		});

		if (!blogData) {
			res.status(404).json(`No blog post with id ${blogId} found.`);
		}

		const blog = blogData.get({ plain: true });

		res.render("blogpostspecific", {
			blog,
			loggedIn: req.session.loggedIn,
			session_id: req.session.user_id,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
