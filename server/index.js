const path = require('path');
const express = require('express');
const app = express(); // create express app
require('dotenv').config();
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

let localTransporter;
let localMailOptions;
localTransporter = require('./email').transporter;
localMailOptions = require('./email').mailOptions;
let mailTo = require('./email').mailTo;
// const transporter = process.env.TRANSPORTER || localTransporter;
const email = process.env.EMAIL || localMailOptions;
const transporter =
	localTransporter ||
	nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: email,
			pass: process.env.MAILPASS,
		},
	});

// add middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());

app.get('/test', (req, res) => {
	console.log('test route activated');
});

app.post('/sendemail', (req, res) => {
	console.log('sendemail request received.');
	try {
		console.log('req.body is: ', req.body);
		const { firstName, lastName, message } = req.body;
		if (!message) throw 'could not send email';
		transporter.sendMail(
			{
				from: email,
				to: mailTo,
				subject: `New message from Website visitor`,
				text: `First Name: ${firstName}, Last Name: ${lastName}, message: ${message}`,
			},
			function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(422).send({ error: 'could not send email' });
	}
});

app.use((req, res, next) => {
	res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// start express server on port 5000
app.listen(5000, () => {
	console.log('server started on port 5000');
});
