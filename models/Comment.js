const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// creates our Comment model (table in our database)
class Comment extends Model {}
// specify what is contained within our Comment table
Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1],
			},
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "user",
				key: "id",
			},
		},
		blogpost_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "blogpost",
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "comment",
	}
);

module.exports = Comment;
