import styles from './Search.module.scss';
import { useEffect, useRef } from 'react';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { users } from '@shared/const';

export default function Search({ setUsers }: any) {
	const inputRef: any = useRef();

	async function search() {
		if (!inputRef.current.value) return;
		setUsers(
			users.filter((user) => {
				let name = user.surname + ' ' + user.firstname + ' ' + user.lastname;
				return name
					.toLowerCase()
					.includes(inputRef.current.value.toLowerCase());
			})
		);
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
