import styles from './Schedule.module.scss';
import { Page, Button, Wrapper } from '@shared/ui';
import { CalendarBlock } from '@features/calendar';
import { useState, useEffect } from 'react';
import { getAllData } from '@entities/schedule';
import moment from 'moment';

export default function SchedulePage({ isStudent = false }) {
	const [data, setData] = useState([]);
	const [date, setDate] = useState();
	// eslint-disable-next-line no-unused-vars
	const [err, setErr] = useState(null);

	useEffect(() => {
		getAllData(date, 10)
			.then((data) => {
				if (data.length) {
					setData(data);
				} else {
					setData([
						{
							start: new Date(new Date().setHours(0, 0, 0)).toISOString(),
							place: { name: '' }
						}
					]);
				}
			})
			.catch(setErr);
	}, [date]);

	return (
		<Page title="Расписание">
			<div className={styles.table}>
				{data.map((item, index) => (
					<div key={index} className={styles.row}>
						<div className={styles.col}>
							{moment(item.start).format('HH:mm')}
						</div>
						<div className={styles.col}>
							<span className={styles.col_content}>
								{item.place.name && `Место - ${item.place.name}`}
							</span>
						</div>
					</div>
				))}
			</div>
			<Wrapper>
				<CalendarBlock setNewDate={setDate} />
				{/* TODO: заменить на dropdownButton */}
				{isStudent && (
					<Button width="100%" title="Выберите тренера" downArrow />
				)}
			</Wrapper>
		</Page>
	);
}
