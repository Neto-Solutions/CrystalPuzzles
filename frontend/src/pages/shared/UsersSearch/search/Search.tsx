import styles from './Search.module.scss';
import { RefObject, useEffect, useRef } from 'react';
import {
	Subscription,
	debounceTime,
	distinctUntilChanged,
	fromEvent
} from 'rxjs';
import { users } from '@shared/const';

export default function Search({ setUsers }: any) {
	const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

	async function search() {
		if (inputRef.current && inputRef.current.value) {
			setUsers(
				users.filter((user) => {
					const name = `${user.surname} ${user.firstname} ${user.lastname}`;
					return name
						.toLowerCase()
						.includes(inputRef.current!.value.toLowerCase());
				})
			);
		}
	}

	useEffect(() => {
		let subscription: Subscription | undefined;
		if (inputRef.current) {
			subscription = fromEvent(inputRef.current, 'keyup')
				.pipe(debounceTime(500), distinctUntilChanged())
				.subscribe(() => search());
		}
		return () => {
			subscription?.unsubscribe();
		};
	}, ['search']);

	return (
		<div className={styles.container}>
			<input ref={inputRef} className={styles.input} type="text" />
		</div>
	);
}
