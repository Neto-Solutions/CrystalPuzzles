import styles from './Schedule.module.scss';
import { useState, useEffect } from 'react';
import { Page, Wrapper } from '@shared/ui';
import { CalendarBlock } from '@features';
import ScheduleItem from './ScheduleItem/ScheduleItem';
import { Lesson } from '@api';

export default function SchedulePage({ link = false }: any) {
	const [data, setData] = useState<any>([]);
	const [date, setDate]: any = useState({
		from: new Date().toISOString(),
		to: new Date().toISOString()
	});

	useEffect(() => {
		Lesson.get({ start: date.from, end: date.to }).then(setData);
	}, [date]);

	return (
		<Page title="Расписание">
			<div className={styles.table}>
				{data
					? data.map((item: any, index: number) => (
							<ScheduleItem
								data={item}
								key={index}
								link={link}
								className={index === 0 && styles.last}
							/>
						))
					: null}
			</div>
			<Wrapper>
				<CalendarBlock date={date} setDate={setDate} />
			</Wrapper>
		</Page>
	);
}
