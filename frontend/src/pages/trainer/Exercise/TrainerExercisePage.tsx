import styles from './TrainerExercisePage.module.scss';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { DateChanger, Feedback } from '@features';
import { Button, EmojiCard, Page } from '@shared/ui';
import { Exercises } from '@widgets';
import { Lesson } from '@shared/api';

interface TrainerExercisePageProps {
	title: string;
}

export default function TrainerExercisePage({
	title
}: TrainerExercisePageProps) {
	const { id }: any = useLoaderData();
	const [, setData] = useState<any>({});

	useEffect(() => {
		getLessons();
	}, []);

	async function getLessons() {
		const [data, err] = await Lesson.getById(id);
		if (err) return;
		setData(data);
	}
	return (
		<Page title={title}>
			<div className={styles.container}>
				<DateChanger className={styles.date} />
				{/* <StudentsDropdown state={data} setState={setData} /> */}
				{/* <DropdownButton
					setState={(ids: string[]) => {
						setCheckList((prev: any) => ({ ...prev, students: ids }));
					}}
					title="Выберите учеников"
					state={checkList.students}
					data={data}
					className={styles.btn}
				/> */}
				{/* <ul className={styles.students_card}>
					{data?.check
						? data?.check[0]?.student.map((item: any) => (
								<li key={item.id}>
									<UserCard name={joinName(item)} img={avatar} />
								</li>
							))
						: null}
				</ul> */}
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
