import { useEffect } from 'react';

/**
 *
 * @param {any} callback
 * @param {number} ignoreValue
 */
export default function useSwipe(
	callback: any,
	deps: any[] = [],
	ignoreValue = 100
) {
	let startX: number, endX: number, startY: number, endY: number;
	startX = endX = startY = endY = 0;

	function touchStart(e: any) {
		startX = e.touches[0].clientX;
		startY = e.touches[0].clientY;
	}

	function touchEnd(e: any) {
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
	}

	useEffect(() => {
		document.addEventListener('touchstart', touchStart, false);
		document.addEventListener('touchend', touchEnd, false);

		return () => {
			document.removeEventListener('touchstart', touchStart, false);
			document.removeEventListener('touchend', touchEnd, false);
		};
	}, deps);
}
