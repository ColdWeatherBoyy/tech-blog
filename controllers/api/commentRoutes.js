const router = require("express").Router();
const { User, BlogPost, Comment } = require("../../models/index");

router.post("/", async (req, res) => {
	try {
		const currentURL = new URL(req.headers.referer).href;
		const blogpost_id = currentURL.split("/")[currentURL.split("/").length - 1];

		const text = req.body.comment;

		const newComment = await Comment.create({
			text: text,
			blogpost_id: blogpost_id,
			user_id: req.session.user_id,
		});

		res.json({ newComment });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
