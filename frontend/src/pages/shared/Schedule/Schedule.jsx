import styles from './Schedule.module.scss';
import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Page, Wrapper } from '@shared/ui';
import { CalendarBlock } from '@features/calendar';
import moment from 'moment';
import ScheduleItem from './ScheduleItem/ScheduleItem';

export default function SchedulePage({ link = false }) {
	const { lessons } = useLoaderData();
	const [data, setData] = useState([]);
	const [date, setDate] = useState(
		new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
	);

	useEffect(() => {
		let filteredLessons = lessons.filter((item) =>
			moment(item.start).isSame(date, 'day')
		);
		for (let i = 0; filteredLessons.length < 7; i++) {
			filteredLessons.push({});
		}
		setData(filteredLessons);
	}, [date]);

	return (
		<Page title="Расписание">
			<div className={styles.table}>
				{data
					? data.map((item, index) => (
							<ScheduleItem data={item} key={index} link={link} />
						))
					: null}
			</div>
			<Wrapper>
				<CalendarBlock setNewDate={setDate} />
			</Wrapper>
		</Page>
	);
}
