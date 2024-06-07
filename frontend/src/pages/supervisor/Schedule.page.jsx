import styles from './Schedule.page.module.scss';
import { Page, Button } from '@shared/ui';
import CalendarTable from '@widgets/calendar.table';
import { CalendarButton } from '@features/calendar';

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
