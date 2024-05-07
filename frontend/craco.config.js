const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@methodist': path.resolve(__dirname, 'src/pages/methodist'),
			'@trainer': path.resolve(__dirname, 'src/pages/trainer'),
			'@kids': path.resolve(__dirname, 'src/pages/kids'),
			'@check.in': path.resolve(__dirname, 'src/pages/check.in')
		}
	}
};
