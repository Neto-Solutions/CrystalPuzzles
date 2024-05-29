import styles from './Schedule.page.module.scss';
import Page from '@shared/ui/page/Page';
import { CalendarButton } from '@features/calendar';
import Button from '@shared/ui/button/Button';
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
