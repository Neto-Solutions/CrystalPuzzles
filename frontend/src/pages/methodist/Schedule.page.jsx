import Page from '@components/page/Page';
import CalendarTable from '@components/calendar/calendar.table/Calendar.table';
import Button from '@components/button/Button';
import CalendarButton from '@components/button/calendar/';
import styles from './Schedule.page.module.scss';

export default function SchedulePage() {
	return (
		<Page title="Расписание тренеров">
			<CalendarTable />
			<div className={styles.buttons_container}>
				<CalendarButton />
				<Button title="Составить расписание" />
			</div>
		</Page>
	);
}
