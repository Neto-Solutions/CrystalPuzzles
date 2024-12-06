import styles from './TrainerExercisePage.module.scss';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { DateChanger, Feedback } from '@features';
import { Button, DropdownButton, EmojiCard, Page, UserCard } from '@shared/ui';
import { Exercises } from '@widgets';
import { Lesson } from '@shared/api';
import joinName from 'entities/profile/assets/joinName';
import avatar from '@shared/assets/avatar/0.png';
import { serverUrl } from '@entities';

interface TrainerExercisePageProps {
	title: string;
}

export default function TrainerExercisePage({
	title
}: TrainerExercisePageProps) {
	const { id }: any = useLoaderData();
	const [data, setData] = useState<any>({});
	const [exercises, setExercises] = useState<any>([]);
	const [selectedStudents, setSelectedStudents] = useState<any>([]);

	useEffect(() => {
		getLessons();
	}, []);

	async function getLessons() {
		const [data, err] = await Lesson.getById(id);
		if (err) return;
		setData(data);
		setSelectedStudents([data?.check[0]?.student.id]);
		setExercises(
			data?.check[0]?.training_data.map((item: any) => ({
				...item,
				name: item.training.name
			}))
		);
	}
	return (
		<Page title={title}>
			<div className={styles.container}>
				<DateChanger className={styles.date} />
				{/* <StudentsDropdown state={data} setState={setData} /> */}
				<DropdownButton
					setState={(ids: string[]) => {
						setSelectedStudents(ids);
					}}
					title="Выберите учеников"
					state={selectedStudents}
					data={data?.check?.map((item: any) => ({
						...item.student,
						name: joinName(item.student)
					}))}
					className={styles.btn}
				/>
				<ul className={styles.students_card}>
					{data?.check
						?.filter((item: any) => selectedStudents.includes(item.student.id))
						.map((item: any) => (
							<li key={item.id}>
								<UserCard
									name={joinName(item.student)}
									img={
										item.student.photo
											? serverUrl() + item.student.photo
											: avatar
									}
								/>
							</li>
						))}
				</ul>
				{exercises.length ? (
					<Exercises
						data={exercises.map((item: any) => ({
							...item,
							name: item.training.name
						}))}
						className={styles.exercises}
						checked
					/>
				) : (
					''
				)}
				<Feedback title="Оставить комментарий" className={styles.feedback} />
				<div className={styles.wrapper}>
					<EmojiCard className={styles.emoji} />
					<Button title="Отправить комментарий" bgColor='dark'  width='100%'/>
				</div>
			</div>
		</Page>
	);
}
