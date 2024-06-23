const ejs = require('ejs');
const fs = require('fs');

fs.existsSync('./origin') || fs.mkdirSync('./origin');
fs.existsSync('./origin/index.html') ||
	fs.copyFileSync('./public/index.html', './origin/index.html');

let originHtml = fs.readFileSync('./origin/index.html', 'utf8');

let newHtml = ejs.render(originHtml, {
	REACT_APP_SERVER_API: process.env.REACT_APP_SERVER_API
});

fs.writeFileSync('./public/index.html', newHtml);
