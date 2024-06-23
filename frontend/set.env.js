const ejs = require('ejs');
const fs = require('fs');

fs.existsSync('./old') || fs.mkdirSync('./old');
fs.existsSync('./old/index.html') ||
	fs.copyFileSync('./public/index.html', './old/index.html');

let oldHtml = fs.readFileSync('./old/index.html', 'utf8');

let newHtml = ejs.render(oldHtml, {
	REACT_APP_SERVER_API: process.env.REACT_APP_SERVER_API
});

fs.writeFileSync('./public/index.html', newHtml);
