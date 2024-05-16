const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@app': path.resolve(__dirname, 'src/app'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@widgets': path.resolve(__dirname, 'src/widgets'),
			'@features': path.resolve(__dirname, 'src/features'),
			'@entities': path.resolve(__dirname, 'src/entities'),
			'@shared': path.resolve(__dirname, 'src/shared'),
			'@check.in': path.resolve(__dirname, 'src/pages/check.in'),
			'@methodist': path.resolve(__dirname, 'src/pages/methodist'),
			'@trainer': path.resolve(__dirname, 'src/pages/trainer'),
			'@student': path.resolve(__dirname, 'src/pages/student')
		}
	}
};
