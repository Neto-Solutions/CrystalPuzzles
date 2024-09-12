import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { DateChanger, Feedback } from '@features';
import { Button, EmojiCard, Page, UserCard } from '@shared/ui';
import { Exercises } from '@widgets';
import { Lesson, User } from '@shared/api';
import joinName from 'entities/profile/assets/joinName';
import DropdownButton from 'features/dropdownButton/DropdownButton';
import image from '@shared/assets/avatar/0.png';
import styles from './TrainerExercisePage.module.scss';

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
	const [checkList, setCheckList] = useState<{ students: number[] }>({
		students: []
	});
	const [data, setData] = useState<Student[]>([]);
	const { id }: any = useLoaderData();
	const navigate = useNavigate();

	useEffect(() => {
		//loads lesson and checks if there are checklist data
		//if false redirects to checklist page
		Lesson.getById(id).then((res) => {
			if (!res.check.length) {
				navigate(`/schedule/${id}`);
			}
		});
	}, []);

	useEffect(() => {
		User.getStudents()
			.then((res) => {
				setData(res.map((item: any) => ({ ...item, name: joinName(item) })));
			})
			.catch();
	}, []);

	const selectedStudents = data.filter((student: Student) =>
		checkList.students.includes(student.id)
	);

	return (
		<Page title={title}>
			<div className={styles.container}>
				<DateChanger className={styles.date} />
				<DropdownButton
					setState={(ids: string[]) => {
						setCheckList((prev: any) => ({ ...prev, students: ids }));
					}}
					title="Выберите учеников"
					state={checkList.students}
					data={data}
					className={styles.btn}
				/>
				{selectedStudents.length > 0 && (
					<ul className={styles.students_card}>
						{selectedStudents.map((item: any) => (
							<li key={item.id}>
								<UserCard name={item.name} img={image} />
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
