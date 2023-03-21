module.exports = {
	// helper to format date
	format_date: (date) => {
		const endDate = new Date(date);
		return `${endDate.getUTCMonth() + 1}/${endDate.getUTCDate()}/${
			endDate.getUTCFullYear() + 5
		}`;
	},
	id_checker: (session_id, user_id) => {
		if (session_id === user_id) {
			return true;
		} else {
			return false;
		}
	},
};
