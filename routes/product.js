const router = require('express').Router();
const loginRequired = require('../libs/loginRequired');
const db = require('../models');
const op = require('sequelize');
require('dotenv').config();

router.get('/', async (req, res) => {
	let page;
	page ? req.query.page : 1;
	const maxPage = db.Product.count() / process.env.LIMIT;
	const search = createSearch(req.query).findContent;
	const productList = await db.Product.findAll({
		where: search,
		offset: page * process.env.LIMIT,
		limit: process.env.LIMIT
	});
	// res.render('product/home.html', { productList });
});

const createSearch = (queries) => {
	let findContent = {};
	if (queries.searchType && queries.searchText && queries.searchText.length >= 1) {
		let searchTypes = queries.searchType.toLowerCase().split(',');
		let postQueries = [];
		searchTypes.forEach((type) => {
			if (searchTypes.indexOf(type) >= 0) {
				postQueries[type] = { $like: `%${queries.searchText}%` };
			}
		});
		if (postQueries.length > 0) findContent = { $or: postQueries };
	}
	return { searchType: queries.searchType, searchText: queries.searchText, findContent: findContent };
};

module.exports = router;
