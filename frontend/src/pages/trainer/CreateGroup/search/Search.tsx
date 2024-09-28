import { User } from '@shared/api';
import { RefObject, useRef, useEffect, useState } from 'react';
import {
	fromEvent,
	debounceTime,
	distinctUntilChanged,
	Subscription
} from 'rxjs';
import Student from '../student/Student';
import styles from './Search.module.scss';

export default function Search({ students, setStudents }: any) {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

	async function getStudents() {
		const [data, err] = await User.getStudents();
		if (err) return;
		setUsers(data);
		search(data);
	}

	useEffect(() => {
		getStudents();
	}, []);

	async function search(users: any) {
		setFilteredUsers(() => {
			return users?.filter((item: any) => {
				const { firstname, lastname, surname } = item;
				if (!firstname || !lastname || !surname) return false;
				return (
					item.firstname
						.toLowerCase()
						.includes(inputRef.current?.value.toLowerCase()) ||
					item.lastname
						.toLowerCase()
						.includes(inputRef.current?.value.toLowerCase()) ||
					item.surname
						.toLowerCase()
						.includes(inputRef.current?.value.toLowerCase())
				);
			});
		});
	}

	useEffect(() => {
		let subscription: Subscription | undefined;
		if (inputRef.current && users?.length) {
			subscription = fromEvent(inputRef.current, 'keyup')
				.pipe(debounceTime(500), distinctUntilChanged())
				.subscribe(() => search(users));
		}

		return () => {
			subscription?.unsubscribe();
		};
	}, ['search', users]);

	return (
		<div className={styles.container}>
			<input
				ref={inputRef}
				className={styles.input_text}
				type="text"
				placeholder="Дмитриева Мария"
			/>
			<div className={styles.students_container}>
				{filteredUsers?.length
					? filteredUsers.map((item: any) => (
							<Student
								key={item.id}
								data={item}
								setStudents={setStudents}
								checked={students.includes(item)}
							/>
						))
					: null}
			</div>
		</div>
	);
}
