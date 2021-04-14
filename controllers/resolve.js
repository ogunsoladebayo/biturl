const db = require('../models');
exports.resolver = async (req, res) => {
	const url = await db.urls.findByPk(req.params.strpath);
	if (!url) {
		return res.send('Invalid link, please try again');
	}
	//redirect
	res.status(301).redirect(
		url.link.includes('://') ? url.link : `https://${url.link}`
	);
};
