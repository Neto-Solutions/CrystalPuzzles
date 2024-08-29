require('dotenv').config();
const ejs = require('ejs');
const fs = require('fs');
const { exit } = require('process');

fs.existsSync('./build/index.html') || exit('build/index.html does not exist');

let originHtml = fs.readFileSync('./build/index.html', 'utf8');

let newHtml = ejs.render(originHtml, {
	REACT_APP_SERVER_API: process.env.REACT_APP_SERVER_API
});

fs.writeFileSync('./build/index.html', newHtml);
