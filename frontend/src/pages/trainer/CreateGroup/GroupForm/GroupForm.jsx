import styles from './GroupForm.module.scss';
import { Button } from '@shared/ui';
import { useEffect, useLayoutEffect, useState } from 'react';
import Student from './student/Student';
import GroupName from './group.name/GroupName';
import Search from './search/Search';

export default function GroupForm() {
	const [students, setStudents] = useState([]);
	const [init, setInit] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [name, setName] = useState('');
	const [data, setData] = useState([]);

	function handleSubmit() {
		// eslint-disable-next-line no-unused-vars
		const data = students.map((item) => item._id);
		// createGroup({ name: name, students: data });
	}

	useEffect(() => {
		setData(init);
	}, [init]);

	useLayoutEffect(() => {
		setData(() => {
			return init.filter((item) => !students.includes(item));
		});
	}, [students]);

	return (
		<>
			<div className={styles.container} data-form>
				<GroupName setName={setName} />
				<Search setInit={setInit} />
				{students &&
					students.map((item) => (
						<Student
							key={item._id}
							data={item}
							setStudents={setStudents}
							checked
						/>
					))}
				{/* {data &&
					data.map((item) => (
						<Student key={item._id} data={item} setStudents={setStudents} />
					))} */}
				<Button title="Создать" className={styles.btn} onClick={handleSubmit} />
			</div>
		</>
	);
}
