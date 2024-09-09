import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { DateChanger, Feedback } from '@features';
import { Button, EmojiCard, Page } from '@shared/ui';
import { Exercises } from '@widgets';
import { User } from '@shared/api';
import joinName from 'entities/profile/assets/joinName';
import DropdownButton from 'features/dropdownButton/DropdownButton';
import styles from './TrainerExercisePage.module.scss';

interface TrainerExercisePageProps {
	title: string;
}

export default function TrainerExercisePage({
	title
}: TrainerExercisePageProps) {
	const [checkList, setCheckList] = useState({ students: [] });
	const [data, setData] = useState([]);
	const { lessons }: any = useLoaderData();

	useEffect(() => {
		User.getStudents()
			.then((res) => {
				setData(res.map((item: any) => ({ ...item, name: joinName(item) })));
			})
			.catch();
	}, []);

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
				<Exercises
					data={lessons}
					className={styles.exercises}
					checked
					disabled
				/>
				<Feedback title="Оставить комментарий" className={styles.feedback} />
				<div className={styles.wrapper}>
					<EmojiCard className={styles.emoji} />
					<Button title="Отправить комментарий" />
				</div>
			</div>
		</Page>
	);
}
