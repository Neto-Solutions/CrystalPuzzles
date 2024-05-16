const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@app': path.resolve(__dirname, 'src/app'),
			'@api': path.resolve(__dirname, 'src/api'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@methodist': path.resolve(__dirname, 'src/pages/methodist'),
			'@trainer': path.resolve(__dirname, 'src/pages/trainer'),
			'@student': path.resolve(__dirname, 'src/pages/student'),
			'@check.in': path.resolve(__dirname, 'src/pages/check.in'),
			'@entities': path.resolve(__dirname, 'src/entities'),
			'@store': path.resolve(__dirname, 'src/store')
		}
	}
};
