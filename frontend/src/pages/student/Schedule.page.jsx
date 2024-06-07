import styles from './Schedule.page.module.scss';
import { Page, Button } from '@shared/ui';
import { CalendarBlock } from '@features/calendar';
import { ScheduleTable } from '@features/schedule';

export default function SchedulePage() {
	return (
		<Page title="Расписание">
			<ScheduleTable />
			<div className={styles.calendar}>
				<CalendarBlock />
				<Button className={styles.btn} title="Записаться" />
			</div>
		</Page>
	);
}
