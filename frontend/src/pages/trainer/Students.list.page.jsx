import styles from './Students.list.page.module.scss';
import PageContainer from '@components/page.container/Page.container';
import { useState, useEffect, useRef } from 'react';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

export default function StudentsListPage() {
	const [students, setStudents] = useState([]);
	const inputRef = useRef();

	function search() {}

	useEffect(() => {
		const subscription = fromEvent(inputRef.current, 'keyup')
			.pipe(debounceTime(1000), distinctUntilChanged())
			.subscribe(() => search());
		return () => {
			subscription.unsubscribe();
		};
	}, ['search']);

	return (
		<>
			<PageContainer.Header title="Ученики" />
			<PageContainer.Body>
				<div className={styles.container}>
					<input ref={inputRef} className={styles.input} type="text"></input>
					<div className={styles.search_icon}></div>
				</div>
			</PageContainer.Body>
		</>
	);
}
