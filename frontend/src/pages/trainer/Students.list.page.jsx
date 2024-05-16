import styles from './Students.list.page.module.scss';
import Page from '@shared/ui/page/Page';
import { useEffect, useRef } from 'react';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

export default function StudentsListPage() {
	const inputRef = useRef();

	function search() { }

	useEffect(() => {
		const subscription = fromEvent(inputRef.current, 'keyup')
			.pipe(debounceTime(1000), distinctUntilChanged())
			.subscribe(() => search());
		return () => {
			subscription.unsubscribe();
		};
	}, ['search']);

	return (
		<Page title="Ученики">
			<div className={styles.container}>
				<input ref={inputRef} className={styles.input} type="text"></input>
				<div className={styles.search_icon}></div>
			</div>
		</Page>
	);
}
