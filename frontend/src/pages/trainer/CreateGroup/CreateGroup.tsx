import styles from './CreateGroup.module.scss';
import { Page, Button } from '@shared/ui';
import { useState } from 'react';
import GroupName from './groupName/GroupName';
import Search from './search/Search';
import { Group } from '@shared/api';
import { useSelector } from 'react-redux';
import { selectProfile } from '@app/providers/store/profile';
import { useNavigate } from 'react-router-dom';

interface CreateGroupPageProps {
	title: string;
}

export default function CreateGroupPage({ title }: CreateGroupPageProps) {
	const user = useSelector(selectProfile);
	const [group, setGroup]: any = useState({ name: '', trainer_id: user.id });
	const [students, setStudents]: any = useState([]);
	const navigate = useNavigate();

	function handleSubmit() {
		createGroup();
	}
	async function createGroup() {
		let [data, err] = await Group.create(group);
		if (err) return;
		[data, err] = await Promise.all(
			students.map((student: any) =>
				Group.addStudent({ student_id: student.id, group_id: data })
			)
		);
		if (err) return;
		navigate('/groups', { replace: true });
	}

	return (
		<Page title={title}>
			<div className={styles.container} data-form>
				<GroupName
					setName={(value: string) => setGroup({ ...group, name: value })}
				/>
				<Search students={students} setStudents={setStudents} />
				<Button title="Создать" className={styles.btn} onClick={handleSubmit} />
			</div>
		</Page>
	);
}
