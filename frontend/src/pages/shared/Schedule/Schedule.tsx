import styles from './Schedule.module.scss';
import { useState, useEffect } from 'react';
import { Page, Wrapper } from '@shared/ui';
import { CalendarBlock } from '@features';
import ScheduleItem from './ScheduleItem/ScheduleItem';
import { Lesson } from '@api';
import moment from 'moment';

interface SchedulePageProps {
	link?: boolean;
	title: string;
}

export default function SchedulePage({
	link = false,
	title
}: SchedulePageProps) {
	const [data, setData] = useState<any>([]);
	const [date, setDate]: any = useState({
		from: moment().startOf('day').toISOString(),
		to: moment().endOf('day')
	});

	useEffect(() => {
		getLessons();
	}, [date]);

	async function getLessons() {
		const [data, err] = await Lesson.get({
			start_date: date.from.toISOString(),
			end_date: date.to.toISOString()
		});
		if (err) return;
		setData(data);
	}
	return (
		<Page title={title}>
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
