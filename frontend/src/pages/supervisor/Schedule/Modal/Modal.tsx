import { useEffect, useState } from 'react';
import TimePicker from 'react-time-picker';
import moment from 'moment';
import { Button } from '@shared/ui';
import { Lesson } from '@shared/api';
import PlacesDropdown from 'features/placesDropdown/PlacesDropdown';
import TrainersDropdown from 'features/trainersDropdown/TrainersDropdown';
import { ReactComponent as CloseButton } from '@shared/assets/svg/close.svg';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import styles from './Modal.module.scss';

export const AddTreanerSchedule = ({
	day,
	data,
	setActive,
	closeModal
}: any) => {
	const [newLesson, setNewLesson]: any = useState({
		space_id: null,
		trainer_id: data?.trainer_id,
		trainer_comments: null,
		start: moment(day).set({ hour: 12, minute: 0 }).format()
	});

	useEffect(() => {
		setNewLesson({ ...newLesson, trainer_id: data?.trainer_id });
	}, [data.trainer_id]);

	async function handleSubmit() {
		const { space_id, trainer_id, start } = newLesson;
		if (!space_id || !trainer_id || !start) return;
		const [, err] = await Lesson.create(newLesson);
		if (err) return;
		setActive(false);
	}

	//TODO: почистить стили
	return (
		<div className={styles.container}>
			{/* <DateChanger day={day} className={styles.header} /> */}
			<header className={styles.header}>
				<button className={styles.close_btn} onClick={closeModal}>
					<CloseButton className={styles.icon} width={16} />
				</button>
			</header>
			<main className={styles.main}>
				<TrainersDropdown
					state={newLesson.trainer_id}
					setState={(id: string) =>
						setNewLesson({ ...newLesson, trainer_id: id })
					}
					className={styles.trainer}
					single
				/>
				<PlacesDropdown
					state={newLesson.space_id}
					setState={(id: string) =>
						setNewLesson((prev: any) => ({ ...prev, space_id: id }))
					}
					className={styles.place}
					single
				/>
				<div className={styles.time_wrapper}>
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
				</div>
				<textarea
					className={styles.textarea}
					onChange={(e) =>
						setNewLesson((prev: any) => ({
							...prev,
							trainer_comments: e.target.value
						}))
					}
				></textarea>
				<Button className={styles.submit} onClick={handleSubmit} bgColor="dark">
					Отправить
				</Button>
			</main>
		</div>
	);
};
