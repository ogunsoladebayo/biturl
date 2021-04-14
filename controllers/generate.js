const db = require('../models');

// generate random strings of 6 characters
const generate = () => {
	var id;

	// function to generate random string
	const getId = () => {
		const length = 6;
		const result = [];
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result.push(
				characters.charAt(Math.floor(Math.random() * charactersLength))
			);
			id = result.join('');
		}
		// check that the string is unique
		checkUnique(id);
	};

	// function to check if string is not yet in the database
	const checkUnique = async (id) => {
		const existing = await db.urls.findByPk(id);

		// generate a new string if the string is not unique
		if (existing) {
			getId();
		}
	};

	getId();
	return id;
};

module.exports = async (link) => {
	const id = generate();

	// save the url to the db with the string as identifier
	await db.urls.create({ id, link });

	// return the string
	return id;
};
