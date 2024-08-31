import styles from './Modal.module.scss';
import { useState } from 'react';
import { Button } from '@shared/ui';
import { DropDownButton, DateChanger } from '@features';
import moment from 'moment';
import { Lesson } from '@shared/api';

export const AddTreanerSchedule = ({ day, data, setActive }: any) => {
	const [newLesson, setNewLesson]: any = useState({
		space_id: null,
		trainer_id: data?.trainer_id,
		trainer_comments: '',
		start: moment(day).toISOString()
	});

	const handleSubmit = async () => {
		Lesson.add(newLesson)
			.then(() => setActive(false))
			.catch();
		return newLesson;
	};

	return (
		<div className={styles.container}>
			{/* <DateChanger day={day} className={styles.header} /> */}
			<main className={styles.main}>
				{/* <DropDownButton title={'Выберите тренера'} setState={setTrainer} /> */}
				<DropDownButton
					className={styles.place}
					title={'Выберите площадку'}
					data={[{ id: +'1', name: 'Площадка 1' }]}
					setState={(id: string) =>
						setNewLesson((prev: any) => ({ ...prev, space_id: id }))
					}
				/>
				<DropDownButton
					className={styles.time}
					title={'Выберите время'}
					setState={(id: string) =>
						setNewLesson((prev: any) => ({ ...prev, start: id }))
					}
					data={[
						{
							id: moment(day).hours(11).toISOString(),
							name: '11:00'
						},
						{
							id: moment(day).hours(12).toISOString(),
							name: '12:00'
						},
						{
							id: moment(day).hours(15).toISOString(),
							name: '15:00'
						}
					]}
				/>
				<textarea
					className={styles.textarea}
					onChange={(e) =>
						setNewLesson((prev: any) => ({
							...prev,
							trainer_comments: e.target.value
						}))
					}
				></textarea>
				<Button className={styles.submit} onClick={handleSubmit}>
					Отправить
				</Button>
			</main>
		</div>
	);
};
