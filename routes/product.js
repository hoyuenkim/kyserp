const router = require('express').Router();
const loginRequired = require('../libs/loginRequired');
const db = require('../models');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const uploadDir = path.join(__dirname, '../uploads');

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, uploadDir);
	},
	filename: (req, file, callback) => {
		callback(null, `product_${Date.now()}_${file.mimetype.split('/')[1]}`);
	}
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
	// let page;
	// page ? req.query.page : 1;
	// const maxPage = db.Product.count() / process.env.LIMIT;
	// const search = createSearch(req.query).findContent;
	// const productList = await db.Product.findAll({
	// 	where: search,
	// 	offset: page * process.env.LIMIT,
	// 	limit: process.env.LIMIT
	// });
	const maxPage = 5;
	const productList = [
		{ name: 'DKC3102S', section: '원패스', price: 10, cost: 10 },
		{ name: 'DKC3102S', section: '원패스', price: 10, cost: 10 },
		{ name: 'DKC3102S', section: '원패스', price: 10, cost: 10 }
	];
	res.render('product/home', { productList, maxPage });
});

router.get('/regist', loginRequired, (req, res) => {
	res.render('product/regist');
});

router.post('/regist', upload.single('thumbnail'), async (req, res) => {
	try {
		console.log(req.body);
		const product = await db.Product.create({
			name: req.body.name,
			thumbnail: req.file ? req.file.filename : '',
			price: req.body.price,
			cost: req.body.cost
		});
		const stock = await db.Stock.create({
			quantity: req.body.quantity,
			productId: product.id
		});
		await product.addStock(stock);
		res.status(200).redirect('/product');
	} catch (e) {
		console.error(e);
		res.status(500).json(e);
	}
});

router.post('/name/confirm', async (req, res) => {
	console.log(req.body);
	try {
		const product = await db.Product.findOne({
			where: {
				name: req.body.name
			}
		});
		res.status(200).json(product);
	} catch (e) {
		console.log(error);
	}
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
	return {
		searchType: queries.searchType,
		searchText: queries.searchText,
		findContent: findContent
	};
};

module.exports = router;
