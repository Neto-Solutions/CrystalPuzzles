import styles from './Schedule.module.scss';
import { Page, Button, Wrapper } from '@shared/ui';
import { CalendarBlock } from '@features/calendar';
import { useState } from 'react';

export default function SchedulePage() {
	const [lessons] = useState(Array(50).fill({ name: 'Тренер', time: '10:00' }));
	// useEffect(async () => {
	// 	await getAllLessons().then(setLessons);
	// }, []);

	return (
		<Page title="Расписание">
			<div className={styles.table}>
				{lessons.map((item, index) => (
					<div key={index} className={styles.row}>
						<div className={styles.col}>{item.time}</div>
						<div className={styles.col}>{item.name}</div>
					</div>
				))}
			</div>
			<Wrapper>
				<CalendarBlock />
				<Button width="100%" title="Выберите тренера" downArrow />
			</Wrapper>
		</Page>
	);
}
