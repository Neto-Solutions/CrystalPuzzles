import styles from './Schedule.page.module.scss';
import { Page } from '@shared/ui';
import { CalendarBlock } from '@features/calendar';
import { Button } from '@shared/ui';
import { ScheduleTable } from '@features/schedule';
export default function SchedulePage() {
	return (
		<Page title="Расписание">
			<ScheduleTable />
			<div className={styles.calendar}>
				<CalendarBlock />
				<Button title="Записаться" />
			</div>
		</Page>
	);
}
