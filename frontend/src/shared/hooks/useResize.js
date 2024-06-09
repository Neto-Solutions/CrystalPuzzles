import { useState, useEffect } from 'react';

const config = { xs: 375, sm: 425, md: 768, lg: 1440, xl: 1920 };

/**
 * @param {string} size
 */
export default function useResize(size) {
	const [state, setState] = useState(false);

	const handleResize = (size) => {
		const width = window.innerWidth;
		if (width <= size) {
			setState(true);
			return;
		}
		setState(false);
	};

	useEffect(() => {
		window.addEventListener('resize', () => handleResize(config[size]));
		return () => {
			window.removeEventListener('resize', () => handleResize(config[size]));
		};
	}, []);

	return state;
}
