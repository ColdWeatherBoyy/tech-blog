const router = require("express").Router();
const { User, BlogPost, Comment } = require("../../models/index");

// create blogpost route
router.post("/", async (req, res) => {
	try {
		if (!req.session.loggedIn) {
			return res.status(404).json("You gotta login!");
		}
		const { title, post } = req.body;

		if (!title || !post) {
			return res.status(404).json("Please provide a valid title and post.");
		}

		const user_id = req.session.user_id;

		const newBlog = await BlogPost.create({ title, post, user_id });

		res.status(200).json(newBlog);
	} catch (err) {
		res.status(500).json(err);
	}
});

// delete option for blogposts
router.delete("/:id", (req, res) => {
	try {
		const blog_id = req.params.id;
		BlogPost.destroy({ where: { id: blog_id } });

		res.status(204).end();
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
