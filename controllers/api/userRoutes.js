const router = require("express").Router();
const { User, BlogPost, Comment } = require("../../models/index");

// get specific user route (again excluding password and JOINing their posts and comments)
router.get("/:id", async (req, res) => {
	try {
		const userId = req.params.id;

		const userData = await User.findByPk(userId, {
			attribute: { exclude: ["password"] },
			// if I needed to pull user with their blogposts/comments
			// include: [
			// 	{
			// 		model: BlogPost,
			// 		attributes: ["id", "title", "post", "created_at"],
			// 	},
			// 	{
			// 		model: Comment,
			// 		attributes: ["id", "text", "created_at"],
			// 		include: {
			// 			model: BlogPost,
			// 			attributes: ["title"],
			// 		},
			// 	},
			// ],
		});

		if (!userData) {
			return res.status(404).json(`No user found with ID ${userId}.`);
		}

		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// post route for user creation
router.post("/", async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(404).json("Please provide a valid name, email, and password");
		}

		const newUser = await User.create({ name, email, password });

		// activates current loggedin session
		req.session.save(() => {
			req.session.id = userData.id;
			req.session.loggedIn = true;
		});

		res.status(200).json(newUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

// login route
router.post("/login", async (req, res) => {
	try {
		const userData = await User.findOne({ where: { email: req.body.email } });

		if (!userData) {
			return res.status(404).json({ message: "Email not found, please try again." });
		}

		const validPassword = userData.checkPassword(req.body.password);

		console.log(validPassword);

		if (!validPassword) {
			return res
				.status(404)
				.json({ message: "Password doesn't match our records, please try again" });
		}

		req.session.save(() => {
			req.session.id = userData.id;
			req.session.loggedIn = true;
		});

		res.status(200).json({ message: "Hooray, you are logged in." });
	} catch (err) {
		res.status(500).json(err);
	}
});

// logout request
router.post("/logout", (req, res) => {
	if (req.session.loggedin) {
		req.session.destroy();
		res.status(201).json({ message: "You are not logged in anymore." });
	} else {
		res.status(404).json({ message: "You are not logged in anymore." });
	}
});

module.exports = router;
