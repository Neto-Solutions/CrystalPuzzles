import styles from './TrainerExercisePage.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { DateChanger, Feedback } from '@features';
import { Button, EmojiCard, Page, UserCard } from '@shared/ui';
import { Exercises } from '@widgets';
import { Lesson, User } from '@shared/api';
import joinName from 'entities/profile/assets/joinName';
import StudentsDropdown from 'features/studentsDropdown/StudentsDropdown';
import avatar from '@shared/assets/avatar/0.png';
//TODO: вынести тип в отдельный файл
type Student = {
	id: number;
	email: string;
	firstname: string;
	lastname: string;
	surname: string;
	birthday: string;
	is_man: boolean;
	contact: string;
	role: string;
	avatar: number;
	photo: string;
};
interface TrainerExercisePageProps {
	title: string;
}

export default function TrainerExercisePage({
	title
}: TrainerExercisePageProps) {
	const { id }: any = useLoaderData();
	const [data, setData] = useState<Student[]>([]);

	useEffect(() => {
		getLessons();
	}, []);

	async function getLessons() {
		const [data, err] = await Lesson.getById(id);
		if (err) return;
		setData([data]);
	}

	const selectedStudents = useMemo(() => {
		if (!data.length) return [];
		return [data];
	}, [data]);

	return (
		<Page title={title}>
			<div className={styles.container}>
				<DateChanger className={styles.date} />
				<StudentsDropdown state={data} setState={setData} />
				{/* <DropdownButton
					setState={(ids: string[]) => {
						setCheckList((prev: any) => ({ ...prev, students: ids }));
					}}
					title="Выберите учеников"
					state={checkList.students}
					data={data}
					className={styles.btn}
				/> */}
				{selectedStudents && selectedStudents.length > 0 && (
					<ul className={styles.students_card}>
						{selectedStudents.map((item: any) => (
							<li key={item.id}>
								<UserCard name={item.name} img={avatar} />
							</li>
						))}
					</ul>
				)}
				<Exercises data={[]} className={styles.exercises} checked disabled />
				<Feedback title="Оставить комментарий" className={styles.feedback} />
				<div className={styles.wrapper}>
					<EmojiCard className={styles.emoji} />
					<Button title="Отправить комментарий" />
				</div>
			</div>
		</Page>
	);
}
