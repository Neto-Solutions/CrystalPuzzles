import { useState } from 'react';
import moment from 'moment';
import { Button } from '@shared/ui';
import { DropDownButton } from '@features';
import { Lesson } from '@shared/api';
import PlacesDropdown from 'features/placesDropdown/PlacesDropdown';
import styles from './Modal.module.scss';

export const AddTreanerSchedule = ({ day, data, setActive }: any) => {
	const [newLesson, setNewLesson]: any = useState({
		space_id: null,
		trainer_id: data?.trainer_id,
		trainer_comments: '',
		start: moment(day)	});

	async function handleSubmit() {
		const [, err] = await Lesson.create(newLesson);
		if (err) return;
		setActive(false);
	}

	return (
		<div className={styles.container}>
			{/* <DateChanger day={day} className={styles.header} /> */}
			<main className={styles.main}>
				<PlacesDropdown
					state={newLesson.space_id}
					setState={(id: string) =>
						setNewLesson((prev: any) => ({ ...prev, space_id: id }))
					}
					className={styles.place}
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
