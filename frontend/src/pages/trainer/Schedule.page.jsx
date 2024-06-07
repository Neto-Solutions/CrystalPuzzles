import styles from './Schedule.page.module.scss';
import { Page } from '@shared/ui';
import { CalendarButton } from '@features/calendar';
import { Button } from '@shared/ui';
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
