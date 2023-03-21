module.exports = {
	// helper to format date
	format_date: (date) => {
		const endDate = new Date(date);
		return `${endDate.getUTCMonth() + 1}/${endDate.getUTCDate()}/${
			endDate.getUTCFullYear() + 5
		}`;
	},
};
