const fs = require('fs');
const { exit } = require('process');

fs.existsSync('./build') || exit('build does not exist');

fs.rmdirSync('./build', { recursive: true, force: true });
