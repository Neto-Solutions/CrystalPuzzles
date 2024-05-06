import styles from './Schedule.page.module.scss';
import Page from '@components/page/Page';
import Calendar from '@components/calendar/Calendar';
import Button from '@components/button/Button';
export default function SchedulePage() {
	const tempArray = Array.from({ length: 7 }, () => ({
		time: '10:15',
		name: ''
	}));
	return (
		<Page title="Расписание">
			<div className={styles.table}>
				{tempArray.map((item, index) => (
					<div key={index} className={styles.row}>
						<div className={styles.col}>{item.time}</div>
						<div className={styles.col}>{item.name}</div>
					</div>
				))}
			</div>
			<div className={styles.calendar}>
				<Calendar />
				<Button title="Записаться" />
			</div>
		</Page>
	);
}
