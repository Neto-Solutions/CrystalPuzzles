import styles from './Schedule.page.module.scss';
import Page from '@shared/ui/page/Page';
import Calendar from '@features/calendar.block/Calendar';
import Button from '@shared/ui/button/Button';
import ScheduleTable from '@widgets/schedule/schedule.table/Schedule.table';

export default function SchedulePage() {
	return (
		<Page title="Расписание">
			<ScheduleTable />
			<aside className={styles.calendar}>
				<Calendar />
				<Button title="Записаться" />
			</aside>
		</Page>
	);
}
