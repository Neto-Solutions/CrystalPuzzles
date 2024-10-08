import { RefObject, useEffect } from 'react';

type EventType =
	| 'mousedown'
	| 'mouseup'
	| 'focusin'
	| 'focusout'
	| 'touchstart'
	| 'touchend';

interface UseClickOutsideProps {
	ref: RefObject<HTMLElement>;
	handleClickOutside: (event: MouseEvent | TouchEvent | FocusEvent) => void;
}

export const useClickOutside = ({
	ref,
	handleClickOutside
}: UseClickOutsideProps) => {
	useEffect(() => {
		const eventTypes: EventType[] = [
			'mousedown',
			'mouseup',
			'focusin',
			'focusout',
			'touchstart',
			'touchend'
		];

		const listener = (event: MouseEvent | TouchEvent | FocusEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}
			handleClickOutside(event);
		};

		eventTypes.forEach((eventType) =>
			document.addEventListener(eventType, listener)
		);

		return () => {
			eventTypes.forEach((eventType) =>
				document.removeEventListener(eventType, listener)
			);
		};
	}, [ref, handleClickOutside]);
};
