import { Page } from '@shared/ui';
import CalendarTable from '@widgets/calendar.table';
import { Button } from '@shared/ui';
import { CalendarButton } from '@features/calendar';
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
