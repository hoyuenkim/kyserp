const router = require('express').Router();
const loginRequired = require('../libs/loginRequired');
const db = require('../models');
require('dotenv').config();

router.get('/', async (req, res) => {
	let page;
	page ? req.query.page : 1;
	const maxPage = db.Product.count();

	const productList = await db.Product.findAll({
		where: {},
		offset: page * process.env.LIMIT,
		limit: process.env.LIMIT
	});
	res.send('yes');
	// res.render('product/home.html', { productList });
});

const createSearch = (queries) => {
	let findContent = {};
	if (queries.searchType && queries.searchText && queries.searchText.length >= 1) {
		let searchTypes = queries.searchType.toLowerCase().split(',');
		let postQueries = [];
		if (searchTypes.indexOf() >= 0) {
			postQueries.push({ homename: { $regex: new RegExp(queries.searchText, 'i') } });
		}
		if (postQueries.length > 0) findContent = { $or: postQueries };
	}
	return { searchType: queries.searchType, searchText: queries.searchText, findContent: findContent };
};

module.exports = router;
