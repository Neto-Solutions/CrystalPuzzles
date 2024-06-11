import { useEffect } from 'react';

/**
 *
 * @param {Function} callback
 * @param {number} ignoreValue
 */
export default function useSwipe(callback, ignoreValue = 100) {
	let startX, endX, startY, endY;
	startX = endX = startY = endY = 0;

	useEffect(() => {
		window.addEventListener(
			'touchstart',
			(e) => {
				startX = e.touches[0].clientX;
				startY = e.touches[0].clientY;
			},
			false
		);

		window.addEventListener(
			'touchend',
			(e) => {
				endX = e.changedTouches[0].clientX;
				endY = e.changedTouches[0].clientY;
				if (
					Math.abs(startX - endX) < ignoreValue ||
					Math.abs(startY - endY) > ignoreValue / 2
				) {
					return;
				}
				if (startX - endX > 0) {
					callback(false);
				} else {
					callback(true);
				}
			},
			false
		);

		return () => {
			window.removeEventListener('touchstart', null);
			window.removeEventListener('touchend', null);
		};
	}, []);
}
