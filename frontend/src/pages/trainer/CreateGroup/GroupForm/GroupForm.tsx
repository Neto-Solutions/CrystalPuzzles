import styles from './GroupForm.module.scss';
import { Button } from '@shared/ui';
import { useState } from 'react';
import Student from './student/Student';
import GroupName from './group.name/GroupName';
import Search from './search/Search';

export default function GroupForm() {
	const [students, setStudents]: any = useState([]);
	// const [init, setInit]: any = useState([]);
	// eslint-disable-next-line no-unused-vars
	// const [name, setName]: any = useState('');
	// // eslint-disable-next-line no-unused-vars
	// const [data, setData]: any = useState([]);

	function handleSubmit() {
		// eslint-disable-next-line no-unused-vars
		// const data = students.map((item: any) => item.id);
		// createGroup({ name: name, students: data} : any);
	}

	// useEffect(() => {
	// 	setData(init);
	// }, [init]);

	// useLayoutEffect(() => {
	// 	setData(() => {
	// 		return init.filter((item: any) => !students.includes(item));
	// 	});
	// }, [students]);

	return (
		<>
			<div className={styles.container} data-form>
				<GroupName />
				<Search />
				{students &&
					students.map((item: any) => (
						<Student
							key={item.id}
							data={item}
							setStudents={setStudents}
							checked
						/>
					))}
				{/* {data &&
					data.map((item: any) => (
						<Student key={item.id} data={item} setStudents={setStudents} />
					))} */}
				<Button title="Создать" className={styles.btn} onClick={handleSubmit} />
			</div>
		</>
	);
}
