import { useEffect, useState } from 'react';
import moment from 'moment';
import { Button } from '@shared/ui';
import { DropDownButton } from '@features';
import { Lesson, Place } from '@shared/api';
import styles from './Modal.module.scss';

export const AddTreanerSchedule = ({ day, data, setActive }: any) => {
	const [newLesson, setNewLesson]: any = useState({
		space_id: null,
		trainer_id: data?.trainer_id,
		trainer_comments: '',
		start: moment(day).toISOString()
	});
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		Place.get().then(([data, err]) => {
			if (err) return;
			setPlaces(data);
		});
	}, []);

	const handleSubmit = async () => {
		Lesson.create(newLesson).then(([, err]) => {
			if (err) return;
			setActive(false);
		});
		return newLesson;
	};

	return (
		<div className={styles.container}>
			{/* <DateChanger day={day} className={styles.header} /> */}
			<main className={styles.main}>
				<DropDownButton
					className={styles.place}
					title={'Выберите площадку'}
					data={places}
					setState={(id: string) =>
						setNewLesson((prev: any) => ({ ...prev, space_id: id }))
					}
					state={newLesson.space_id}
					single
				/>
				<DropDownButton
					className={styles.time}
					title={'Выберите время'}
					setState={(id: string) =>
						setNewLesson((prev: any) => ({ ...prev, start: id }))
					}
					state={newLesson.start}
					single
					data={[
						{
							id: moment(day).hours(11).format(),
							name: '11:00'
						},
						{
							id: moment(day).hours(12).format(),
							name: '12:00'
						},
						{
							id: moment(day).hours(15).format(),
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
