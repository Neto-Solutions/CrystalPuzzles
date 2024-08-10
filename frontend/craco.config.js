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
			'@checkIn': path.resolve(__dirname, 'src/pages/checkIn'),
			'@supervisor': path.resolve(__dirname, 'src/pages/supervisor'),
			'@trainer': path.resolve(__dirname, 'src/pages/trainer'),
			'@student': path.resolve(__dirname, 'src/pages/student'),
			'@hooks': path.resolve(__dirname, 'src/shared/hooks'),
			'@api': path.resolve(__dirname, 'src/shared/api'),
			'@store': path.resolve(__dirname, 'src/app/providers/store'),
			'@const': path.resolve(__dirname, 'src/shared/const'),
			assets: path.resolve(__dirname, 'src/shared/assets'),
			styles: path.resolve(__dirname, 'src/app/styles')
		}
	}
};
