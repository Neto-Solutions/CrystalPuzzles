import { useState, useEffect } from 'react';

const config = { sm: 440, md: 840, lg: 1200 };

/**
 * @param {string} size
 */

type Size = 'sm' | 'md' | 'lg';

export default function useResize(size: Size) {
	const [state, setState]: any = useState(window.innerWidth <= config[size]);

	const handleResize = (size: number) => {
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
