const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const db = require('../models');
const passport = require('passport');
const nodemailer = require('node-mailer');
const passwordHash = require('../libs/passwordHash');
const codeHash = require('../libs/codeHash');
const codeUnhash = require('../libs/codeUnhash');
require('dotenv').config();

router.get('/join', csrfProtection, (req, res) => {
	res.render('accounts/join.html', { csrfToken: req.csrfToken() });
});

router.post('/join', csrfProtection, async (req, res) => {
	const email = req.body.email;
	const username = req.body.username;
	const emailUrl = await email.split(`@`);
	let authority = 'client';
	if (emailUrl[1] === 'kysco.kr' && emailUrl[0] === 'admin') {
		authority = `admin`;
	}
	if (emailUrl[1] === 'kysco.kr' && username != 'admin') {
		authority = `kys`;
	}
	db.Users
		.create({
			username: req.body.username,
			password: req.body.password,
			name: req.body.name,
			email: email,
			mobile: req.body.mobile,
			address: req.body.address,
			address_detail: req.body.address_detail,
			authority: authority,
			verify: false
		})
		.then(() => {
			const url = codeHash(req.body.email);
			const email = req.body.email;
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: process.env.GOOGLE_ID,
					pass: process.env.GOOGLE_PASSWORD
				}
			});
			const mailOptions = {
				from: 'kys@kysco.kr',
				to: email,
				subject: '다산카이스 서비스 가입 확인 메일',
				text: `
				  안녕하세요. 다산카이스입니다.

				  ${req.body.name}님의 가입확인 메일입니다.

				  아래 url을 클릭하셔서 회원가입 인증을 하시는 것을 요청드립니다.
				  http://${process.env.DOMAIN}/accounts/verify/${url}
				`
			};
			transporter.sendMail(mailOptions, (err, info) => {
				if (err) console.error(err);
				console.log('email sent : ' + info.response);
			});
		})
		.catch((err) => {
			if (err) console.error(err);
		})
		.then(() => {
			res.send(`success`);
		});
});

router.get('/success', (req, res) => {
	res.render('accounts/success.html', { message: `등록하신 이메일로 이메일 인증을 해주세요.` });
});

router.get('/vertify/:url', async (req, res) => {
	const email = codeUnhash(req.query.url);
	db.Users
		.update(
			{
				where: {
					email
				}
			},
			{
				verify: true
			}
		)
		.catch((err) => {
			if (err) console.error(err);
		});
});

router.post(
	'/login',
	csrfProtection,
	passport.authenticate('local', {
		failureRedirect: '/',
		failureFlash: true
	}),
	(req, res) => {
		res.redirect('/main');
	}
);

router.post('/username/confirm', async (req, res) => {
	const user = await db.Users.findOne({
		where: {
			username: req.body.username
		}
	});
	res.send({ res: user });
});

router.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/');
});

module.exports = router;
