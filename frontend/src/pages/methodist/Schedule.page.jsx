import Page from '@shared/ui/page/Page';
import CalendarTable from '@widgets/calendar.table/Calendar.table';
import Button from '@shared/ui/button/Button';
import CalendarButton from '@features/calendar.button';
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
