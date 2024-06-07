import styles from './Schedule.page.module.scss';
import { Page, Button } from '@shared/ui';
import { CalendarButton } from '@features/calendar';
import { ScheduleTable } from '@features/schedule';

export default function SchedulePage() {
	return (
		<Page title="Расписание">
			<ScheduleTable />
			<aside className={styles.calendar}>
				<CalendarButton />
				<Button title="Записаться" />
			</aside>
		</Page>
	);
}
