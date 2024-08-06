import styles from './Search.module.scss';
import { useEffect, useRef } from 'react';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

export default function Search() {
	const inputRef = useRef();

	async function search() {
		if (!inputRef.current.value) return;
	}

	useEffect(() => {
		const subscription = fromEvent(inputRef.current, 'keyup')
			.pipe(debounceTime(500), distinctUntilChanged())
			.subscribe(() => search());
		return () => {
			subscription.unsubscribe();
		};
	}, ['search']);

	return (
		<div className={styles.container}>
			<input ref={inputRef} className={styles.input} type="text" />
		</div>
	);
}
