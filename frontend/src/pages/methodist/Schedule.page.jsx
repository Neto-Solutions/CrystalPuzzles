import Page from '@components/page/Page';
import CalendarTable from '@components/calendar/calendar.table/Calendar.table';
import Button from '@components/button/Button';
import styles from './Schedule.page.module.scss';

export default function SchedulePage() {
	return (
		<Page title="Расписание тренеров">
			<CalendarTable />
			<div className={styles['btns_wrap']}>
				<Button />
				<Button title="Составить расписание" />
			</div>
		</Page>
	);
}
