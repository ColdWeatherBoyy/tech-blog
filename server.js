// the dependencies
const express = require("express");
const session = require("express-session");
const path = require("path");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
require("dotenv").config();

// sequelize
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// sets up session constant
const sess = {
	secret: process.env.SESSION_SECRET,
	cookie: { maxAge: 360000 },
	resave: false,
	saveUninitialized: false,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

// middleware for sessions
app.use(session(sess));

// handlebars turned on
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// middleware for parsing and public folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// middleware for routes
app.use("/", routes);

// initialize sequelize and express listener
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log("Now listening"));
});
