const router = require("express").Router();
const { User, BlogPost, Comment } = require("../../models/index");

router.post("/:id", async (req, res) => {
	try {
		if (!user_id) {
			res.status(404).json("You gotta log in!");
		}
		const message = await Comment.create({
			...req.body,
			blogpost_id: req.params.id,
			user_id: req.session.user_id,
		});
		res.json({ message });
	} catch (err) {
		res.status(500).json(err);
	}
});
