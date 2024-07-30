import { useState, useEffect } from 'react';

const config = { sm: 440, md: 840, lg: 1200 };

/**
 * @param {string} size
 */
export default function useResize(size) {
	const [state, setState] = useState(window.innerWidth <= config[size]);

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
