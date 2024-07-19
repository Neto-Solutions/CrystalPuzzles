import styles from './Search.module.scss';
import { useEffect, useRef } from 'react';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { getStudents } from '@entities/student';
import { useNavigate } from 'react-router-dom';

export default function Search() {
	const inputRef = useRef();
	const navigate = useNavigate();

	async function search() {
		if (!inputRef.current.value) return;
		await getStudents(inputRef.current.value)
			// .then(console.log)
			.catch(() => navigate('/login'));
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
