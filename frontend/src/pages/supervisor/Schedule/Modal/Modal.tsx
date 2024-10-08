import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { useState } from 'react';
import moment from 'moment';
import { Button } from '@shared/ui';
import { Lesson } from '@shared/api';
import PlacesDropdown from 'features/placesDropdown/PlacesDropdown';
import styles from './Modal.module.scss';
import TrainersDropdown from 'features/trainersDropdown/TrainersDropdown';
import TimePicker from 'react-time-picker';

export const AddTreanerSchedule = ({ day, data, setActive }: any) => {
	const [newLesson, setNewLesson]: any = useState({
		space_id: null,
		trainer_id: data?.trainer_id,
		trainer_comments: null,
		start: moment(day).set({ hour: 12, minute: 0 }).format()
	});

	async function handleSubmit() {
		const { space_id, trainer_id, start } = newLesson;
		if (!space_id || !trainer_id || !start) return;
		const [, err] = await Lesson.create(newLesson);
		if (err) return;
		setActive(false);
	}

	return (
		<div className={styles.container}>
			{/* <DateChanger day={day} className={styles.header} /> */}
			<main className={styles.main}>
				<TrainersDropdown
					state={newLesson.trainer_id}
					setState={(id: string) =>
						setNewLesson({ ...newLesson, trainer_id: id })
					}
					className={styles.trainer}
					single
				/>
				<TimePicker
					className={styles.time}
					maxDetail="minute"
					onInput={(e) => {
						if (e.target.value.length >= 2) {
							e.target.value = e.target.value.slice(0, 2);
						}
					}}
					onChange={(e: any) => {
						if (!e) return;
						setNewLesson((prev: any) => ({
							...prev,
							start: moment(day)
								.set({ hour: e.split(':')[0], minute: e.split(':')[1] })
								.format()
						}));
					}}
					value={moment(newLesson.start).format('HH:mm')}
					format="HH:mm"
					locale="sv-sv"
					disableClock
					clearIcon={null}
				/>

				<PlacesDropdown
					state={newLesson.space_id}
					setState={(id: string) =>
						setNewLesson((prev: any) => ({ ...prev, space_id: id }))
					}
					className={styles.place}
					single
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
