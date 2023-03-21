const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// create User model (table in our database)
class User extends Model {
	// password validation
	checkPassword(loginPw) {
		return bcrypt.compareSync(loginPw, this.password);
	}
}

// specify what is contained within our user table
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [8],
			},
		},
	},
	{
		hooks: {
			// password hashing before create
			beforeCreate: async (newUserData) => {
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
				return newUserData;
			},
			// password hashing before update
			beforeUpdate: async (newUserData) => {
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
				return newUserData;
			},
			// uniformity of email data before create
			beforeCreate: async (newUserData) => {
				newUserData.email = await newUserData.email.toLowerCase();
				return newUserData;
			},
			// uniformity of email data before create
			beforeUpdate: async (updatedUserData) => {
				updatedUserData.email = await updatedUserData.email.toLowerCase();
				return updatedUserData;
			},
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "user",
	}
);

module.exports = User;
